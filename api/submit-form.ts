import { Client } from '@notionhq/client';
import { Resend } from 'resend';
import * as fs from 'fs';
import * as path from 'path';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

// Map resource titles to PDF filenames
const resourcePdfMap: Record<string, string> = {
  "C12's Strategic Planning Guide": 'strategic-planning-guide.pdf',
  "From Survival to Sustainability": 'survival-to-sustainability.pdf',
  "Customer Loyalty & Referrals": 'customer-loyalty-referrals.pdf',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    const {
      firstName,
      lastName,
      email,
      phone,
      organization,
      industry,
      experience,
      resourceDownloaded
    } = body;

    // Initialize Notion client
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });

    // Add lead to Notion database
    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID!,
      },
      properties: {
        'Name': {
          title: [
            {
              text: {
                content: `${firstName} ${lastName}`,
              },
            },
          ],
        },
        'Email': {
          email: email,
        },
        'Phone': {
          phone_number: phone || '',
        },
        'Organization': {
          rich_text: [
            {
              text: {
                content: organization || '',
              },
            },
          ],
        },
        'Industry': {
          select: {
            name: industry || 'Not specified',
          },
        },
        'Experience': {
          select: {
            name: experience || 'Not specified',
          },
        },
        'Resource Downloaded': {
          rich_text: [
            {
              text: {
                content: resourceDownloaded || 'Contact Form Submission',
              },
            },
          ],
        },
        'Date': {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });

    // Send email with PDF if resourceDownloaded is set
    if (resourceDownloaded && email) {
      try {
        const pdfFilename = resourcePdfMap[resourceDownloaded as string];

        if (pdfFilename) {
          // Read the PDF file
          const pdfPath = path.join(process.cwd(), 'public', 'resources', pdfFilename);
          const pdfBuffer = fs.readFileSync(pdfPath);
          const pdfBase64 = pdfBuffer.toString('base64');

          await resend.emails.send({
            from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
            to: email as string,
            subject: `Your C12 Resource: ${resourceDownloaded}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #003B4D;">Thank You for Your Interest in C12!</h2>
                <p>Hi ${firstName},</p>
                <p>Thank you for downloading "<strong>${resourceDownloaded}</strong>" from C12 Indianapolis.</p>
                <p>Your requested resource is attached to this email.</p>
                <p>At C12, we bring together Christian CEOs and business owners in peer advisory groups to build great businesses for a greater purpose. If you'd like to learn more about how C12 can serve you and your business, we'd love to connect.</p>
                <p>Best regards,<br/>
                The C12 Indianapolis Team</p>
                <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;" />
                <p style="font-size: 12px; color: #6B7280;">
                  C12 Indianapolis<br/>
                  <a href="https://c12-indiana.vercel.app" style="color: #D4AF69;">Visit our website</a>
                </p>
              </div>
            `,
            attachments: [
              {
                filename: pdfFilename,
                content: pdfBase64,
              },
            ],
          });
        }
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the entire request if email fails
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully'
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    return res.status(500).json({
      error: 'Failed to submit form',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
