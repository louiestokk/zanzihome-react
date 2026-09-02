import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "louiestokk@gmail.com";
const LIVE_SITE_URL = "https://www.zanzihome.com";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || LIVE_SITE_URL;
const SITE_URL = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(configuredSiteUrl)
  ? LIVE_SITE_URL
  : configuredSiteUrl.replace(/\/$/, "");

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatPrice = (value) => {
  if (value === null || value === undefined || value === "") return "Not specified";
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? `$${numericValue.toLocaleString()}` : String(value);
};

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      from_name,
      from_email,
      title,
      price,
      area,
      category,
      adType,
      packageName,
      paymentMethod,
      adId,
      listingUrl,
      message,
      phone,
      whatsapp,
      rooms,
      size,
      rentOrSell,
      companyName
    } = body || {};

    if (!from_name || !from_email || !title || !area || !adId) {
      return Response.json(
        { error: "Missing required listing information." },
        { status: 400 }
      );
    }

    const recipientEmail = String(from_email).trim().toLowerCase();
    const submittedListingUrl = String(listingUrl || "");
    const safeListingUrl = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(submittedListingUrl)
      ? `${LIVE_SITE_URL}/propertys/property/${adId}`
      : submittedListingUrl || `${SITE_URL}/propertys/property/${adId}`;
    const safePrice = formatPrice(price);
    const safeCategory = category || adType || "Property";
    const safeCompanyName = companyName || from_name;

    const userHtml = `
      <div style="font-family: Arial, sans-serif; background: #f5f7f5; padding: 32px 16px; color: #1f2937;">
        <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 18px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 12px 32px rgba(1, 58, 23, 0.08);">
          <div style="background: linear-gradient(135deg, #013a17 0%, #0d2818 100%); padding: 28px 24px; color: #ffffff;">
            <div style="font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.9;">ZanziHome</div>
            <h2 style="margin: 12px 0 0; font-size: 28px; line-height: 1.2;">Your listing is live</h2>
          </div>
          <div style="padding: 28px 24px 20px;">
            <p style="margin: 0 0 12px; font-size: 16px;">Hi ${escapeHtml(from_name)},</p>
            <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.7; color: #4b5563;">
              Your property listing has been published successfully on ZanziHome. We have received your details and your ad is now visible to potential buyers and renters in Zanzibar.
            </p>

            <div style="background: #f7faf8; border: 1px solid #dfeae2; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
              <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 8px;">Your listing details</div>
              <p style="margin: 0 0 8px; font-size: 18px; font-weight: 700; color: #013a17;">${escapeHtml(title)}</p>
              <p style="margin: 0; font-size: 14px; color: #374151; line-height: 1.7;">
                <strong>Location:</strong> ${escapeHtml(area)}<br />
                <strong>Category:</strong> ${escapeHtml(safeCategory)}<br />
                <strong>Price:</strong> ${escapeHtml(safePrice)}<br />
                <strong>Package:</strong> ${escapeHtml(packageName || "Free Listing")}
              </p>
            </div>

            <div style="background: #fffaf0; border: 1px solid #f1dfb4; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
              <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #8a6d2f; margin-bottom: 8px;">Your listing link</div>
              <a href="${safeListingUrl}" style="color: #013a17; font-size: 14px; line-height: 1.6; word-break: break-word;">${escapeHtml(safeListingUrl)}</a>
            </div>

            <div style="margin: 20px 0; text-align: center;">
              <a
                href="${safeListingUrl}"
                style="display: inline-block; background: #013a17; color: #ffffff; text-decoration: none; padding: 14px 22px; border-radius: 10px; font-weight: 700; font-size: 15px;"
              >
                View your listing
              </a>
            </div>

            <div style="background: #f7faf8; border: 1px solid #dfeae2; border-radius: 12px; padding: 18px; margin-top: 22px;">
              <p style="margin: 0 0 10px; font-size: 16px; font-weight: 700; color: #013a17;">How to edit your listing</p>
              <p style="margin: 0; font-size: 14px; line-height: 1.8; color: #4b5563;">
                1. Go to ZanziHome and choose <strong>Sign up</strong> using this same email address: ${escapeHtml(from_email)}.<br />
                2. Create a password and complete your account registration.<br />
                3. Log in using the same email address and password.<br />
                4. Open your <strong>Account</strong>, choose <strong>Manage Ads</strong>, and select this listing to edit it, add photos, or update the details.
              </p>
            </div>
            <p style="margin: 22px 0 0; font-size: 14px; color: #374151;">
              Best regards,<br />
              <strong>ZanziHome Team</strong>
            </p>
          </div>
        </div>
      </div>
    `;

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; background: #f5f7f5; padding: 32px 16px; color: #1f2937;">
        <div style="max-width: 700px; margin: 0 auto; background: #ffffff; border-radius: 18px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 12px 30px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #0d2818 0%, #013a17 100%); padding: 26px 24px; color: #ffffff;">
            <div style="font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.9;">New listing</div>
            <h2 style="margin: 12px 0 0; font-size: 28px; line-height: 1.2;">A new property has been published</h2>
          </div>
          <div style="padding: 28px 24px;">
            <div style="margin-bottom: 16px; padding: 18px; border-radius: 12px; background: #f7faf8; border: 1px solid #dfeae2;">
              <p style="margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280;">Listing title</p>
              <p style="margin: 0; font-size: 22px; font-weight: 700; color: #013a17;">${escapeHtml(title)}</p>
            </div>

            <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 40%;"><strong>Advertiser name:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${escapeHtml(from_name)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Email:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${escapeHtml(from_email)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Company / seller:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${escapeHtml(safeCompanyName)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Phone:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${escapeHtml(phone || "Not provided")}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>WhatsApp:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${escapeHtml(whatsapp || "Not provided")}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Category:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${escapeHtml(safeCategory)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Area:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${escapeHtml(area)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Price:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${escapeHtml(safePrice)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Rooms:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${escapeHtml(rooms || "Not provided")}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Size:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${escapeHtml(size || "Not provided")}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Listing type:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${escapeHtml(rentOrSell || "Not provided")}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Package:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${escapeHtml(packageName || "Free Listing")}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Payment method:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${escapeHtml(paymentMethod || "N/A")}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Ad ID:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${escapeHtml(adId)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;"><strong>Listing URL:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">
                  <a href="${safeListingUrl}" style="color: #013a17; text-decoration: none;">${escapeHtml(safeListingUrl)}</a>
                </td>
              </tr>
            </table>

            <div style="margin-top: 20px;">
              <p style="margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280;">Description</p>
              <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #374151;">${escapeHtml(message || "No description provided.")}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    const [userEmail, adminEmail] = await Promise.all([
      resend.emails.send({
        from: "ZanziHome <louie@zanzihome.com>",
        to: [recipientEmail],
        replyTo: ADMIN_EMAIL,
        subject: "Your listing has been published on ZanziHome",
        html: userHtml,
      }),
      resend.emails.send({
        from: "ZanziHome <louie@zanzihome.com>",
        to: [ADMIN_EMAIL],
        replyTo: from_email,
        subject: `New Listing Published: ${title}`,
        html: adminHtml,
      }),
    ]);

    const userEmailError = userEmail.error?.message || userEmail.error;
    const adminEmailError = adminEmail.error?.message || adminEmail.error;

    if (userEmailError || adminEmailError) {
      console.error("Listing email delivery failed:", {
        userEmailError,
        adminEmailError,
        recipientEmail,
      });

      return Response.json(
        {
          error: userEmailError
            ? `The listing was published, but the confirmation email could not be sent: ${userEmailError}`
            : `The listing was published, but the admin notification could not be sent: ${adminEmailError}`,
          userEmailId: userEmail.data?.id || null,
          adminEmailId: adminEmail.data?.id || null,
        },
        { status: 502 }
      );
    }

    return Response.json({
      ok: true,
      userEmailId: userEmail.data?.id || null,
      adminEmailId: adminEmail.data?.id || null,
    });
  } catch (error) {
    console.error("Listing email send failed:", error);
    return Response.json(
      {
        error:
          error?.message || "Something went wrong while sending the listing email. Please try again.",
      },
      { status: 500 }
    );
  }
}
