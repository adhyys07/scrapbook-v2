import { Resend } from "resend";
import { config } from "dotenv";

// load environment variables
config();

const resendApiKey = process.env.AUTH_RESEND_KEY ?? process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

type EmailParams = {
    subject: string,
    to: string,
    htmlBody: string
}
export async function sendEmail({ subject, to, htmlBody }: EmailParams) {
    if (!resend) {
        throw new Error("Missing Resend API key. Set AUTH_RESEND_KEY or RESEND_API_KEY.");
    }
    const { data, error } = await resend.emails.send({
        from: "josias <scrapbook@auth.josiasw.dev>",
        to: [to],
        subject,
        html: `<div>${htmlBody}</div>`
    });
    if (error) {
        throw Error("Failed to send email: " + JSON.stringify(error));
    }
    return data;
}