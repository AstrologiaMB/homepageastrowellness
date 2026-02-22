import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const FROM_EMAIL = process.env.FROM_EMAIL || 'info@astrochat.online'

export interface EmailOptions {
    to: string | string[]
    subject: string
    html: string
    text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailOptions): Promise<boolean> {
    const toAddresses = Array.isArray(to) ? to : [to]

    try {
        if (!resend) {
            console.warn('No email service configured (RESEND_API_KEY missing)')
            return false
        }

        for (const email of toAddresses) {
            await resend.emails.send({
                from: FROM_EMAIL,
                to: email,
                subject,
                html,
                text,
            })
        }
        return true
    } catch (error) {
        console.error('Error sending email:', error)
        return false
    }
}
