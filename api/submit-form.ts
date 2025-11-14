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
      resourceDownloaded,
      source
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
        ...(phone ? {
          'Phone': {
            phone_number: phone,
          },
        } : {}),
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
        ...(resourceDownloaded ? {
          'Resource Downloaded': {
            rich_text: [
              {
                text: {
                  content: resourceDownloaded,
                },
              },
            ],
          },
        } : {}),
        'Source': {
          select: {
            name: source || 'Unknown',
          },
        },
        'Date Submitted': {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });

    // Send confirmation email based on source
    console.log('Checking email sending conditions:', { resourceDownloaded, email, source, hasEmail: !!email });

    if (email) {
      // Send PDF email for resource downloads
      if (resourceDownloaded) {
      console.log('Sending email for resource:', resourceDownloaded);
      try {
        const pdfFilename = resourcePdfMap[resourceDownloaded as string];
        console.log('Mapped PDF filename:', pdfFilename);

        if (pdfFilename) {
          // Read the PDF file
          const pdfPath = path.join(process.cwd(), 'public', 'resources', pdfFilename);
          console.log('PDF path:', pdfPath);

          const pdfBuffer = fs.readFileSync(pdfPath);
          console.log('PDF buffer size:', pdfBuffer.length);

          const pdfBase64 = pdfBuffer.toString('base64');
          console.log('PDF base64 length:', pdfBase64.length);

          console.log('Sending email via Resend...');
          const emailResult = await resend.emails.send({
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
          console.log('Email sent successfully!', emailResult);
        } else {
          console.log('No PDF filename mapped for resource:', resourceDownloaded);
        }
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the entire request if email fails
      }
      }

      // Send confirmation email for Contact Form and Executive Briefing
      if (source === 'Contact Form' || source === 'Executive Briefing') {
        console.log('Sending confirmation email for:', source);
        try {
          const logoUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://c12-indiana.vercel.app'}/og-image.png`;

          const emailResult = await resend.emails.send({
            from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
            to: email as string,
            subject: source === 'Executive Briefing'
              ? 'Thank You for Your Interest in C12 Executive Briefing'
              : 'Thank You for Contacting C12 Indianapolis',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                  <img src="${logoUrl}" alt="C12 Indianapolis and Fort Wayne" style="max-width: 300px; height: auto;" />
                </div>

                <h2 style="color: #003B4D; margin-bottom: 20px;">Thank You for Your Interest in C12!</h2>

                <p style="font-size: 16px; line-height: 1.6; color: #333;">Hi ${firstName},</p>

                <p style="font-size: 16px; line-height: 1.6; color: #333;">
                  Thank you for reaching out to C12 Indianapolis${source === 'Executive Briefing' ? ' and expressing interest in our Executive Briefing' : ''}.
                  We're excited to connect with you!
                </p>

                <p style="font-size: 16px; line-height: 1.6; color: #333;">
                  A member of our team will be in touch with you within one business day to discuss how C12 can serve you
                  and your business.
                </p>

                <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 30px 0;">
                  <p style="font-size: 14px; line-height: 1.6; color: #4B5563; margin: 0;">
                    <strong style="color: #003B4D;">About C12:</strong><br/>
                    C12 brings together Christian CEOs and business owners in peer advisory groups to build great businesses
                    for a greater purpose. We help leaders integrate biblical wisdom into their business practices while
                    growing profitability and impact.
                  </p>
                </div>

                <p style="font-size: 16px; line-height: 1.6; color: #333;">
                  In the meantime, feel free to explore our website to learn more about what C12 offers.
                </p>

                <p style="font-size: 16px; line-height: 1.6; color: #333;">
                  Best regards,<br/>
                  <strong>The C12 Indianapolis Team</strong>
                </p>

                <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;" />

                <div style="text-align: center;">
                  <p style="font-size: 12px; color: #6B7280; margin-bottom: 10px;">
                    C12 Indianapolis and Fort Wayne
                  </p>
                  <p style="font-size: 12px; color: #6B7280;">
                    <a href="https://c12-indiana.vercel.app" style="color: #D4AF69; text-decoration: none;">Visit our website</a>
                  </p>
                </div>
              </div>
            `,
          });
          console.log('Confirmation email sent successfully!', emailResult);
        } catch (emailError) {
          console.error('Error sending confirmation email:', emailError);
          // Don't fail the entire request if email fails
        }
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
