import {Request, Response} from "express";
import {getRepository} from "typeorm";
import validator from "validator"
import * as jwt from "jsonwebtoken";
import {User} from "../../src/entity/User";
import {ERROR_CODES, ERROR_MESSAGES} from "../../utils/errors";
import {EmailService} from "../../services/email/email-service";
import {LOGIN_SUBJECT, LOGIN_BODY} from "../../services/email/content";
import logger from "../../utils/logger"

export async function Signup(req: Request, res: Response): Promise<Response> {
    const email: string = req.body.email as string
    try {

        if (!validator.isEmail(email)) {
            return res.status(400).json({message: ERROR_MESSAGES.INVALID_EMAIL});
        }
        ;

        const user = new User();
        user.email = email
        await getRepository(User).save(user)

        return res.status(200).send();
    } catch (e: any) {
        if (e && e.code === ERROR_CODES.UNIQUE_CONSTRAINT_VIOLATION) {
            return res.status(400).json({message: ERROR_MESSAGES.EMAIL_TAKEN});
        }
        logger.error(JSON.stringify(e.stack, null, 2))
        return res.status(500).send();
    }
}

export async function Login(req: Request, res: Response): Promise<Response> {
    const email: string = req.body.email as string
    try {

        const user = await getRepository(User).findOne({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(403).send();
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: 60 * 60 * 16, // 16 Hours
            }
        );
        const emailService = new EmailService()

        await emailService.sendMail(email, LOGIN_SUBJECT, LOGIN_BODY(token))
        return res.status(200).send();
    } catch (e: any) {
        logger.error(JSON.stringify(e.stack, null, 2))
        return res.status(500).send();
    }

}


