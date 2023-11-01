import nodemailer from 'nodemailer';

export const  sendMail = async (name,email,next)=>{
    try {
        // Create email transporter
        // SMTP (Simple Mail Transfer Protocol)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'voiceofinvincible@gmail.com',
                pass: 'eawb wung zlft bgad'
            },
        });

        // Configure email content
        const mailOptions = {
            from: 'voiceofinvincible@gmail.com',
            to: email,
            subject: 'Application Confirmation',
            text: `Dear ${name}, Your application has been received. Thank you for applying! After reviewing your resume, We will get back to you.`,
        };

        // Send the email
        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (err) {
        console.log(err);
        console.log('Email not sent');
    }
}