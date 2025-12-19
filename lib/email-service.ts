import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import { Resend } from 'resend'

// Configurar servicios de email
const sesClient = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? new SESClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
}) : null

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
        // 1. Intentar con AWS SES
        if (sesClient) {
            const params = {
                Source: FROM_EMAIL,
                Destination: {
                    ToAddresses: toAddresses,
                },
                Message: {
                    Subject: { Data: subject },
                    Body: {
                        Html: { Data: html },
                        Text: text ? { Data: text } : undefined,
                    },
                },
            }

            await sesClient.send(new SendEmailCommand(params))
            return true
        }

        // 2. Intentar con Resend
        if (resend) {
            // Resend free tier might limit to single recipient, but let's try
            // For safety, let's just loop if multiple (rare case) or send to first
            for (const email of toAddresses) {
                await resend.emails.send({
                    from: FROM_EMAIL,
                    to: email,
                    subject: subject,
                    html: html,
                    text: text
                })
            }
            return true
        }

        console.warn('No email service configured (SES or Resend)')
        return false
    } catch (error) {
        console.error('Error sending email:', error)
        return false
    }
}
