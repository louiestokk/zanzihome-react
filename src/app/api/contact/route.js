import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = "louiestokk@gmail.com";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

export async function POST(request) {
  try {
    const body = await request.json();
    const { from_name, from_email, subject, message } = body || {};

    if (!from_name || !from_email || !subject || !message) {
      return Response.json(
        { error: "Please fill in name, email, subject and message." },
        { status: 400 }
      );
    }

    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
        <h2 style="color: #013a17; margin-bottom: 12px;">We have received your request</h2>
        <p>Hi ${escapeHtml(from_name)},</p>
        <p>Thank you for contacting ZanziHome. We have received your request and will get back to you as soon as possible.</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Your message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        <p>Best regards,<br />ZanziHome Team</p>
      </div>
    `;

    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
        <h2 style="color: #013a17; margin-bottom: 12px;">New contact request</h2>
        <p><strong>Full name:</strong> ${escapeHtml(from_name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(from_email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      </div>
    `;

    const [userEmail, adminEmail] = await Promise.all([
      resend.emails.send({
        from: "ZanziHome <louie@zanzihome.com>",
        to: [from_email],
        subject: "We have received your request",
        html: userEmailHtml,
      }),
      resend.emails.send({
        from: "ZanziHome <louie@zanzihome.com>",
        to: [ADMIN_EMAIL],
        replyTo: from_email,
        subject: `New Contact Request: ${subject}`,
        html: adminEmailHtml,
      }),
    ]);

    return Response.json({
      ok: true,
      userEmailId: userEmail.data?.id || null,
      adminEmailId: adminEmail.data?.id || null,
    });
  } catch (error) {
    console.error("Contact email send failed:", error);
    return Response.json(
      {
        error:
          error?.message || "Something went wrong while sending the email. Please try again.",
      },
      { status: 500 }
    );
  }
}
