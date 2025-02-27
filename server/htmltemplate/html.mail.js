export const confirmationEmailTemplate = 
     `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Email Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
                <h2>Email Confirmation</h2>
            </div>
            <div style="padding: 20px;">
                <p>Hello {name},</p>
                <p>Thank you for registering with us. Please click the button below to confirm your email address:</p>
                <p style="text-align: center;">
                    <a href="{link}" 
                       style="background-color: #007bff; color: white; padding: 10px 20px; 
                              text-decoration: none; border-radius: 5px; display: inline-block;">
                        Confirm Email
                    </a>
                </p>
                <p>If you didn't create an account, you can safely ignore this email.</p>
                <p>Best regards,<br>Your Team</p>
            </div>
            <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
                <p>This is an automated message, please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
    `

