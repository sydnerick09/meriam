import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  jobTitle: '',
  companyName: '',
  jobSource: '',
  yearsExperience: '',
  currentRole: '',
  keySkills: '',
  linkedinUrl: '',
  coverNote: '',
  heardAbout: '',
};

function validate(form) {
  const errors = {};
  if (!form.firstName.trim()) errors.firstName = 'First name is required';
  if (!form.lastName.trim()) errors.lastName = 'Last name is required';
  if (!form.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address';
  if (!form.phone.trim()) errors.phone = 'Phone number is required';
  if (!form.jobTitle.trim()) errors.jobTitle = 'Job title is required';
  if (!form.companyName.trim()) errors.companyName = 'Company name is required';
  if (!form.keySkills.trim()) errors.keySkills = 'Please list your key skills';
  if (!form.coverNote.trim()) errors.coverNote = 'Please provide a brief note about your experience';
  if (form.coverNote.trim().length < 50) errors.coverNote = 'Please provide at least 50 characters about yourself';
  return errors;
}

export default function Apply() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [paystackLoaded, setPaystackLoaded] = useState(false);

 useEffect(() => {
  if (window.PaystackPop) {
    setPaystackLoaded(true);
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://js.paystack.co/v1/inline.js';
  script.async = true;

  script.onload = () => {
    setPaystackLoaded(true);
  };

  script.onerror = () => {
    setServerError('Failed to load payment system.');
  };

  document.body.appendChild(script);
}, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }
async function handleSubmit(e) {
  e.preventDefault();
  setServerError('');

  const validationErrors = validate(form);
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  // ✅ Ensure Paystack is ready
  if (!paystackLoaded || typeof window.PaystackPop === 'undefined') {
    setServerError('Payment system is still loading. Please try again.');
    return;
  }

  // ✅ Ensure API key exists
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  if (!publicKey) {
    setServerError('Payment configuration error (missing public key).');
    return;
  }

  setSubmitting(true);

  try {
    const regRes = await fetch('/api/register-application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const regData = await regRes.json();

    if (!regRes.ok || !regData.reference) {
      throw new Error(regData.message || 'Failed to register application');
    }

    const reference = regData.reference;

    const handler = window.PaystackPop.setup({
      key: publicKey,

      email: form.email,

      // ✅ FIXED AMOUNT (Paystack uses kobo/pesewas equivalent)
      amount: 20 * 100,

      currency: 'KES',

      ref: reference,

      metadata: {
        custom_fields: [
          {
            display_name: 'Applicant Name',
            variable_name: 'applicant_name',
            value: `${form.firstName} ${form.lastName}`,
          },
          {
            display_name: 'Job Title',
            variable_name: 'job_title',
            value: form.jobTitle,
          },
        ],
      },

      // ✅ FIXED CALLBACK (must be standard function)
      callback: function (response) {
        fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reference: response.reference,
          }),
        })
          .then((res) => res.json())
          .then((verifyData) => {
            if (verifyData.success) {
              router.push(`/success?ref=${reference}`);
            } else {
              setServerError('Payment verification failed.');
              setSubmitting(false);
            }
          })
          .catch(() => {
            setServerError('Verification failed.');
            setSubmitting(false);
          });
      },

      // ✅ FIXED ON CLOSE
      onClose: function () {
        setSubmitting(false);
        setServerError('Payment window closed.');
      },
    });

    handler.openIframe();
  } catch (error) {
    setServerError(error.message || 'Something went wrong. Please try again.');
    setSubmitting(false);
  }
}

  const Field = ({ label, name, required, type = 'text', as, options, placeholder, hint }) => (
    <div className="form-group">
      <label htmlFor={name}>
        {label}{required && <span>*</span>}
      </label>
      {as === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={errors[name] ? 'error' : ''}
          rows={5}
        />
      ) : as === 'select' ? (
        <select
          id={name}
          name={name}
          value={form[name]}
          onChange={handleChange}
          className={errors[name] ? 'error' : ''}
        >
          <option value="">Select an option</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={errors[name] ? 'error' : ''}
        />
      )}
      {hint && !errors[name] && <span style={{ fontSize: '0.78rem', color: 'var(--gray-500)', marginTop: 4, display: 'block' }}>{hint}</span>}
      {errors[name] && <span className="form-error-text">⚠ {errors[name]}</span>}
    </div>
  );

  return (
    <>
      <Head>
        <title>Submit Application — JobApply</title>
        <meta name="description" content="Fill in your details and pay $20 to receive a professionally written job application email reply." />
      </Head>

      <Navbar />

      <main className="form-page">
        <div className="form-container">
          <div className="form-header">
            <h1>Submit Your Application</h1>
            <p>Fill in all required details below. After payment, your tailored email reply will be sent within 24 hours.</p>
          </div>

          <div className="form-card">
            {serverError && (
              <div className="alert alert-error">
                <span>⚠</span>
                <span>{serverError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Personal Info */}
              <div className="form-section-title">Personal Information</div>
              <div className="form-row">
                <Field label="First Name" name="firstName" required placeholder="e.g. erq" />
                <Field label="Last Name" name="lastName" required placeholder="e.g. laverq" />
              </div>
              <div className="form-row">
                <Field label="Email Address" name="email" type="email" required placeholder="erq.laverq@example.com" hint="Your email reply will be sent to this address" />
                <Field label="Phone Number" name="phone" type="tel" required placeholder="+254 700 000 000" />
              </div>

              <div className="form-divider" />

              {/* Job Details */}
              <div className="form-section-title">Job Application Details</div>
              <div className="form-row">
                <Field label="Job Title Applying For" name="jobTitle" required placeholder="e.g. Marketing Manager" />
                <Field label="Company Name" name="companyName" required placeholder="e.g. TechCorp Ltd" />
              </div>
              <div className="form-row">
                <Field
                  label="How Did You Find the Job?"
                  name="jobSource"
                  as="select"
                  options={[
                    { value: 'linkedin', label: 'LinkedIn' },
                    { value: 'company-website', label: 'Company Website' },
                    { value: 'indeed', label: 'Indeed' },
                    { value: 'referral', label: 'Employee Referral' },
                    { value: 'newspaper', label: 'Newspaper / Print' },
                    { value: 'other', label: 'Other' },
                  ]}
                />
                <Field
                  label="Years of Experience"
                  name="yearsExperience"
                  as="select"
                  options={[
                    { value: '0-1', label: 'Less than 1 year' },
                    { value: '1-3', label: '1 – 3 years' },
                    { value: '3-5', label: '3 – 5 years' },
                    { value: '5-10', label: '5 – 10 years' },
                    { value: '10+', label: '10+ years' },
                  ]}
                />
              </div>
              <Field label="Current Job Title / Most Recent Role" name="currentRole" placeholder="e.g. Junior Developer at ABC Company" />
              <Field
                label="Key Skills & Qualifications"
                name="keySkills"
                as="textarea"
                required
                placeholder="List your top skills relevant to the job, e.g. Project Management, Python, SQL, Communication, Leadership…"
                hint="List at least 4–6 skills most relevant to the role"
              />

              <div className="form-divider" />

              {/* About Yourself */}
              <div className="form-section-title">Tell Us About Yourself</div>
              <Field
                label="Brief Professional Summary"
                name="coverNote"
                as="textarea"
                required
                placeholder="Briefly describe your professional background, main achievements, and why you are a great fit for this role. The more detail you provide, the better your email will be tailored."
                hint="Minimum 50 characters — the more detail you give, the better your email"
              />
              <Field label="LinkedIn Profile URL (Optional)" name="linkedinUrl" type="url" placeholder="https://linkedin.com/in/yourprofile" />
              <Field
                label="How Did You Hear About Us?"
                name="heardAbout"
                as="select"
                options={[
                  { value: 'google', label: 'Google Search' },
                  { value: 'social', label: 'Social Media' },
                  { value: 'friend', label: 'Friend / Colleague' },
                  { value: 'ad', label: 'Online Advertisement' },
                  { value: 'other', label: 'Other' },
                ]}
              />

              <div className="form-divider" />

              {/* Payment Notice */}
              <div className="payment-notice">
                <div className="payment-notice-icon">💳</div>
                <div className="payment-notice-text">
                  <strong>Registration Fee: $20 USD via Paystack</strong>
                  <p>
                    Clicking the button below will open a secure Paystack payment window. After successful payment, your application will be processed and your professional email reply will be delivered to <strong>{form.email || 'your email address'}</strong> within 24 hours.
                  </p>
                </div>
              </div>

              <button type="submit" className="form-submit-btn" disabled={submitting}>
                {submitting ? (
                  <>
                    <span className="spinner" />
                    Processing...
                  </>
                ) : (
                  <>
                    🔒 Pay $20 &amp; Submit Application
                  </>
                )}
              </button>
            </form>
          </div>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.82rem', color: 'var(--gray-500)' }}>
            By submitting, you agree to our{' '}
            <Link href="/terms" style={{ color: 'var(--blue-brand)' }}>Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" style={{ color: 'var(--blue-brand)' }}>Privacy Policy</Link>.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
