// @ts-ignore
import * as nodemailer from 'nodemailer';

// @ts-ignore
export class EmailService {
    private _transporter: nodemailer.Transporter;
    constructor() {
        this._transporter = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
    }
    sendMail(to: string, subject: string, content: string) {
        let options = {
            from: process.env.MAIL_USER,
            to: to,
            subject: subject,
            text: content
        }

        this._transporter.sendMail(
            options, (error, info) => {
                if (error) {
                    return console.log(`error: ${error}`);
                }
                console.log(`Message Sent ${info.response}`);
            });
    }
}
