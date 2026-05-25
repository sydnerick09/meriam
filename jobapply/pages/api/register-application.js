// In-memory store (persists as long as serverless instance is warm)
// For production, replace with a database like PlanetScale, Supabase, or MongoDB Atlas
import { v4 as uuidv4 } from 'uuid';

// Module-level store shared across requests in same instance
if (!global._jobApplications) {
  global._jobApplications = new Map();
}

export const applicationsStore = global._jobApplications;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      jobTitle,
      companyName,
      jobSource,
      yearsExperience,
      currentRole,
      keySkills,
      linkedinUrl,
      coverNote,
      heardAbout,
    } = req.body;

    // Basic validation server-side
    if (!firstName || !lastName || !email || !phone || !jobTitle || !companyName || !keySkills || !coverNote) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Generate unique reference
    const shortId = uuidv4().replace(/-/g, '').substring(0, 10).toUpperCase();
    const reference = `JAP-${shortId}`;

    const application = {
      reference,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      jobTitle: jobTitle.trim(),
      companyName: companyName.trim(),
      jobSource: jobSource || '',
      yearsExperience: yearsExperience || '',
      currentRole: currentRole?.trim() || '',
      keySkills: keySkills.trim(),
      linkedinUrl: linkedinUrl?.trim() || '',
      coverNote: coverNote.trim(),
      heardAbout: heardAbout || '',
      status: 'pending',
      paymentStatus: 'pending',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    applicationsStore.set(reference, application);

    return res.status(200).json({ reference, success: true });
  } catch (err) {
    console.error('Register application error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
