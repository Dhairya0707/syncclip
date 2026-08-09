import { NextResponse } from "next/server";

const GMAIL_WORKER_URL = "https://g-mail.dhairyadarji7867.workers.dev/api/send";
const GMAIL_API_TOKEN = process.env.GMAIL_API_TOKEN || "e82ab2c011ec85ab01b243b1ef66e6ac8a64ac2d69e78e8b03226d9b45e0e809";
const ADMIN_EMAIL = "support.dhairyadarji@gmail.com";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderAdminTemplate(data: { name: string; email: string; inquiryType: string; timestamp: string; message: string }) {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New SYNCCLIP Support Message</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f3f4; font-family: 'Courier New', Courier, monospace; color: #000000;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f3f3f4;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <!-- Internal Alert Container -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 650px; border: 2px solid #000000; background-color: #ffffff; box-shadow: 10px 10px 0px 0px #057dbc;">
                    
                    <!-- Alert Header -->
                    <tr>
                        <td style="background-color: #057dbc; color: #ffffff; padding: 15px 25px; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; font-weight: bold;">
                            NEW INBOUND TRANSMISSION // SYNCCLIP SUPPORT
                        </td>
                    </tr>

                    <!-- Submission Details Table -->
                    <tr>
                        <td style="padding: 35px 40px 10px 40px;">
                            <h2 style="margin: 0; font-family: 'Times New Roman', Times, serif; font-style: italic; font-weight: 900; font-size: 24px; text-transform: uppercase; border-bottom: 2px solid #000000; padding-bottom: 10px; margin-bottom: 25px;">User Info</h2>
                            
                            <table width="100%" style="border-collapse: collapse; font-size: 14px;">
                                <tr>
                                    <td width="150" style="padding: 10px 0; color: #666666; border-bottom: 1px solid #eeeeee; font-weight: bold; text-transform: uppercase;">Operator Name</td>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee;">${escapeHtml(data.name)}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; color: #666666; border-bottom: 1px solid #eeeeee; font-weight: bold; text-transform: uppercase;">Reply-To Email</td>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee;">
                                        <a href="mailto:${escapeHtml(data.email)}" style="color: #057dbc; text-decoration: none; font-weight: bold;">${escapeHtml(data.email)}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; color: #666666; border-bottom: 1px solid #eeeeee; font-weight: bold; text-transform: uppercase;">Inquiry Type</td>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; font-weight: bold;">${escapeHtml(data.inquiryType)}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; color: #666666; border-bottom: 1px solid #eeeeee; font-weight: bold; text-transform: uppercase;">Received At</td>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee;">${escapeHtml(data.timestamp)}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- The Message Content -->
                    <tr>
                        <td style="padding: 30px 40px 40px 40px;">
                            <h2 style="margin: 0; font-family: 'Times New Roman', Times, serif; font-style: italic; font-weight: 900; font-size: 24px; text-transform: uppercase; border-bottom: 2px solid #000000; padding-bottom: 10px; margin-bottom: 20px;">Support Payload</h2>
                            
                            <div style="background-color: #f9f9f9; border: 1px solid #eeeeee; padding: 25px; line-height: 1.6; font-size: 15px; white-space: pre-wrap; color: #000000;">${escapeHtml(data.message)}</div>
                        </td>
                    </tr>

                    <!-- Admin Actions -->
                    <tr>
                        <td align="center" style="padding: 0 40px 40px 40px;">
                            <a href="mailto:${escapeHtml(data.email)}?subject=Re:%20[SYNCCLIP]%20Support%20Inquiry%20-%20${encodeURIComponent(data.inquiryType)}" style="display: block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 18px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; font-size: 13px;">
                                Open Reply Protocol
                            </a>
                        </td>
                    </tr>
                </table>

                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 650px;">
                    <tr>
                        <td align="center" style="padding-top: 20px; font-size: 10px; color: #999999; text-transform: uppercase; letter-spacing: 1px;">
                            This message was generated by the <strong>syncclip.in</strong> support firewall.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

function renderUserConfirmationTemplate(data: { name: string; inquiryType: string; message: string }) {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SYNCCLIP Contact Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: 'Courier New', Courier, monospace; color: #000000; -webkit-font-smoothing: antialiased;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;">
        <tr>
            <td align="center" style="padding: 40px 10px;">
                <!-- Main Container -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; border: 2px solid #000000; background-color: #ffffff; box-shadow: 8px 8px 0px 0px #000000;">
                    
                    <!-- Top Branding Bar -->
                    <tr>
                        <td style="background-color: #000000; color: #ffffff; padding: 12px 20px; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">
                            SYNCCLIP Support Dashboard
                        </td>
                    </tr>

                    <!-- Header Section -->
                    <tr>
                        <td style="padding: 40px 40px 10px 40px;">
                            <h1 style="margin: 0; font-family: 'Times New Roman', Times, serif; font-style: italic; font-weight: 900; font-size: 32px; text-transform: uppercase;">SYNCCLIP</h1>
                        </td>
                    </tr>

                    <!-- Content Section -->
                    <tr>
                        <td style="padding: 20px 40px 40px 40px; line-height: 1.6; font-size: 15px;">
                            <p style="margin-bottom: 25px;">
                                Hi <strong>${escapeHtml(data.name)}</strong>,
                            </p>

                            <p style="margin-bottom: 25px;">
                                We've successfully received your message regarding <strong>${escapeHtml(data.inquiryType)}</strong>.
                            </p>

                            <p style="margin-bottom: 25px; padding: 15px; border-left: 4px solid #057dbc; background-color: #f0f7ff; color: #000000;">
                                <strong>Turnaround Time:</strong> Our team typically reviews all inquiries and responds within <strong>1-2 working days</strong>. We appreciate your patience.
                            </p>

                            <!-- Message Summary -->
                            <div style="border: 1px solid #000000; padding: 25px; margin-bottom: 30px;">
                                <div style="font-size: 10px; text-transform: uppercase; color: #5e5e5e; margin-bottom: 10px; border-bottom: 1px solid #eeeeee; padding-bottom: 5px; font-weight: bold;">
                                    Your Message Details
                                </div>
                                <div style="font-family: inherit; color: #000000; white-space: pre-wrap; font-size: 14px;">${escapeHtml(data.message)}</div>
                            </div>

                            <p style="font-size: 13px; color: #5e5e5e;">
                                If you have any additional details to add, please feel free to reply directly to this email.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 40px; border-top: 1px solid #000000; font-size: 9px; line-height: 1.4; color: #5e5e5e; text-transform: uppercase; letter-spacing: 1px;">
                            © 2026 SYNCCLIP PUBLISHING GROUP<br>
                            Distributed Archival Clipboard // V4.2<br>
                            <a href="https://syncclip.in/support" style="color: #057dbc; text-decoration: none; border-bottom: 1px solid #057dbc; font-weight: bold;">Visit help center</a>
                        </td>
                    </tr>
                </table>

                <!-- Bottom Disclaimer -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" style="padding-top: 20px; font-size: 10px; color: #999999; text-transform: uppercase; letter-spacing: 1px;">
                            This is an automated confirmation of your support request.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, inquiryType, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, email, and message are required." },
        { status: 400 }
      );
    }

    const nowIST = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }) + " IST";

    // 1. Dispatch Internal Support Alert Email (To: ADMIN_EMAIL)
    const adminHtml = renderAdminTemplate({
      name,
      email,
      inquiryType: inquiryType || "General Support",
      timestamp: nowIST,
      message,
    });

    const adminEmailPromise = fetch(GMAIL_WORKER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GMAIL_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: ADMIN_EMAIL,
        subject: `[SYNCCLIP] Support Inquiry - ${inquiryType || "General Support"}`,
        html: adminHtml,
      }),
    });

    // 2. Dispatch User Confirmation Receipt Email (To: User's email)
    const userHtml = renderUserConfirmationTemplate({
      name,
      inquiryType: inquiryType || "General Support",
      message,
    });

    const userEmailPromise = fetch(GMAIL_WORKER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GMAIL_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        subject: `SYNCCLIP Contact Confirmation - ${inquiryType || "General Support"}`,
        html: userHtml,
      }),
    });

    const [adminRes, userRes] = await Promise.allSettled([adminEmailPromise, userEmailPromise]);

    let adminSuccess = false;
    if (adminRes.status === "fulfilled" && adminRes.value.ok) {
      adminSuccess = true;
    } else if (adminRes.status === "fulfilled") {
      const errText = await adminRes.value.text().catch(() => "");
      console.error("Admin support email dispatch worker error:", adminRes.value.status, errText);
    }

    return NextResponse.json({
      success: true,
      message: "Support transmission dispatched successfully.",
      adminSent: adminSuccess,
    });
  } catch (err: any) {
    console.error("Support API route error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process email transmission." },
      { status: 500 }
    );
  }
}
