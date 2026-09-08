import { Resend } from "resend";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const FROM_ADDRESS = "ZanziHome <louie@zanzihome.com>";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

const nl2br = (value = "") => escapeHtml(value).replace(/\n/g, "<br />");

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      userName,
      userEmail,
      userPhone,
      userMessage,
      listingId,
      listingTitle,
      listingUrl,
      companyName,
      companyEmail
    } = body || {};

    if (!userName || !userEmail || !userMessage || !listingUrl || !companyEmail) {
      return Response.json(
        { error: "Missing required inquiry information." },
        { status: 400 }
      );
    }

    // Persist the lead so it shows up in the admin dashboard, grouped by company.
    let leadDocId = null;
    try {
      const leadRef = await addDoc(collection(db, "leads"), {
        userName,
        userEmail,
        userPhone: userPhone || "",
        userMessage,
        listingId: listingId || "",
        listingTitle: listingTitle || "",
        listingUrl,
        companyName: companyName || "",
        companyEmail,
        companyEmailKey: companyEmail.trim().toLowerCase(),
        status: "new",
        createdAt: serverTimestamp()
      });
      leadDocId = leadRef.id;
    } catch (err) {
      console.error("Failed to save lead to Firestore:", err);
    }

    const companyHtml = `
      <div style="font-family: Arial, sans-serif; background: #f5f7f5; padding: 32px 16px; color: #1f2937;">
        <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 18px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 12px 32px rgba(1, 58, 23, 0.08);">
          <div style="background: linear-gradient(135deg, #013a17 0%, #0d2818 100%); padding: 28px 24px; color: #ffffff;">
            <div style="font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.9; color: #ffffff;">ZanziHome</div>
            <h2 style="margin: 12px 0 0; font-size: 26px; line-height: 1.2; color: #ffffff;">New lead for your listing</h2>
          </div>
          <div style="padding: 28px 24px 20px;">
            <p style="margin: 0 0 12px; font-size: 16px;">Dear ${escapeHtml(companyName || "Partner")},</p>
            <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.7; color: #4b5563;">
              You have received a new inquiry for your listing. Please contact the interested party as soon as possible.
            </p>

            <div style="background: #f7faf8; border: 1px solid #dfeae2; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
              <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 8px;">Listing</div>
              <p style="margin: 0 0 8px; font-size: 18px; font-weight: 700; color: #013a17;">${escapeHtml(listingTitle || "")}</p>
              <a href="${listingUrl}" style="color: #013a17; font-size: 14px; word-break: break-word;">${escapeHtml(listingUrl)}</a>
              <p style="margin: 10px 0 0; font-size: 13px; color: #6b7280;"><strong>Property Ref:</strong> ${escapeHtml(listingId || "N/A")}</p>
            </div>

            <div style="background: #fffaf0; border: 1px solid #f1dfb4; border-radius: 12px; padding: 18px;">
              <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #8a6d2f; margin-bottom: 10px;">Interested person's details</div>
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #6b7280; width: 35%;"><strong>Name:</strong></td>
                  <td style="padding: 6px 0; color: #1f2937;">${escapeHtml(userName)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6b7280;"><strong>Email:</strong></td>
                  <td style="padding: 6px 0; color: #1f2937;">${escapeHtml(userEmail)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6b7280;"><strong>Phone:</strong></td>
                  <td style="padding: 6px 0; color: #1f2937;">${escapeHtml(userPhone || "Not provided")}</td>
                </tr>
              </table>
              <div style="margin-top: 12px; font-size: 14px; color: #374151; line-height: 1.7;">
                <strong>Message:</strong><br />
                ${nl2br(userMessage)}
              </div>
            </div>

            <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 13px; color: #6b7280;">
              <strong>Listed by company:</strong> ${escapeHtml(companyName || "N/A")}<br />
              <strong>Company contact email:</strong> ${escapeHtml(companyEmail)}
            </div>

            <p style="margin: 22px 0 0; font-size: 14px; color: #374151;">
              Best regards,<br />
              <strong>ZanziHome Team</strong>
            </p>
          </div>
        </div>
      </div>
    `;

    const userHtml = `
      <div style="font-family: Arial, sans-serif; background: #f5f7f5; padding: 32px 16px; color: #1f2937;">
        <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 18px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 12px 32px rgba(1, 58, 23, 0.08);">
          <div style="background: linear-gradient(135deg, #013a17 0%, #0d2818 100%); padding: 28px 24px; color: #ffffff;">
            <div style="font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.9; color: #ffffff;">ZanziHome</div>
            <h2 style="margin: 12px 0 0; font-size: 26px; line-height: 1.2; color: #ffffff;">Your inquiry has been sent</h2>
          </div>
          <div style="padding: 28px 24px 20px;">
            <p style="margin: 0 0 12px; font-size: 16px;">Hi ${escapeHtml(userName)},</p>
            <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.7; color: #4b5563;">
              Thank you for your interest. We have received your inquiry and forwarded it to
              ${escapeHtml(companyName || "the listing agent")}. They typically respond within 1 hour.
            </p>

            <div style="background: #f7faf8; border: 1px solid #dfeae2; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
              <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 8px;">Listing</div>
              <p style="margin: 0 0 8px; font-size: 18px; font-weight: 700; color: #013a17;">${escapeHtml(listingTitle || "")}</p>
              <a href="${listingUrl}" style="color: #013a17; font-size: 14px; word-break: break-word;">${escapeHtml(listingUrl)}</a>
            </div>

            <div style="background: #fffaf0; border: 1px solid #f1dfb4; border-radius: 12px; padding: 18px;">
              <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #8a6d2f; margin-bottom: 10px;">Your submitted details</div>
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #6b7280; width: 35%;"><strong>Name:</strong></td>
                  <td style="padding: 6px 0; color: #1f2937;">${escapeHtml(userName)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6b7280;"><strong>Email:</strong></td>
                  <td style="padding: 6px 0; color: #1f2937;">${escapeHtml(userEmail)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6b7280;"><strong>Phone:</strong></td>
                  <td style="padding: 6px 0; color: #1f2937;">${escapeHtml(userPhone || "Not provided")}</td>
                </tr>
              </table>
              <div style="margin-top: 12px; font-size: 14px; color: #374151; line-height: 1.7;">
                <strong>Message:</strong><br />
                ${nl2br(userMessage)}
              </div>
            </div>

            <p style="margin: 22px 0 0; font-size: 14px; color: #374151;">
              Best regards,<br />
              <strong>ZanziHome Team</strong>
            </p>
          </div>
        </div>
      </div>
    `;

    // Mail 1: to the company/agent, bcc admin.
    const companyEmailResult = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [companyEmail],
      bcc: [ADMIN_EMAIL],
      replyTo: userEmail,
      subject: `New Lead: ${userName} is interested in ${listingTitle}`,
      html: companyHtml,
    });

    // Mail 2: confirmation to the user who submitted the form.
    const userEmailResult = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [userEmail],
      subject: `We received your inquiry about ${listingTitle}`,
      html: userHtml,
    });

    const companyEmailError = companyEmailResult.error?.message || companyEmailResult.error;
    const userEmailError = userEmailResult.error?.message || userEmailResult.error;

    if (companyEmailError || userEmailError) {
      console.error("Lead email delivery failed:", {
        companyEmailError,
        userEmailError,
        companyEmail,
        userEmail,
      });

      return Response.json(
        {
          error: companyEmailError
            ? `Failed to notify the listing agent: ${companyEmailError}`
            : `The agent was notified, but your confirmation email could not be sent: ${userEmailError}`,
          leadId: leadDocId,
          companyEmailId: companyEmailResult.data?.id || null,
          userEmailId: userEmailResult.data?.id || null,
        },
        { status: 502 }
      );
    }

    return Response.json({
      ok: true,
      leadId: leadDocId,
      companyEmailId: companyEmailResult.data?.id || null,
      userEmailId: userEmailResult.data?.id || null,
    });
  } catch (error) {
    console.error("Lead email send failed:", error);
    return Response.json(
      {
        error: error?.message || "Something went wrong while sending your inquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}
