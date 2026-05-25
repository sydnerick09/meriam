import { applicationsStore } from './register-application';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { ref, email } = req.query;

  if (!ref || !email) {
    return res.status(400).json({ message: 'Reference and email are required' });
  }

  const application = applicationsStore.get(ref.trim().toUpperCase());

  if (!application) {
    return res.status(404).json({
      message: 'Application not found. Please check your reference number. Note: status tracking requires the application to have been submitted in the current server session.',
    });
  }

  if (application.email !== email.trim().toLowerCase()) {
    return res.status(403).json({ message: 'Email address does not match this application.' });
  }

  // Return safe subset of data
  return res.status(200).json({
    reference: application.reference,
    firstName: application.firstName,
    lastName: application.lastName,
    email: application.email,
    jobTitle: application.jobTitle,
    companyName: application.companyName,
    status: application.status,
    paymentStatus: application.paymentStatus,
    submittedAt: application.submittedAt,
    updatedAt: application.updatedAt,
  });
}
