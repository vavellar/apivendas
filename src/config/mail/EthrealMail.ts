import nodemailer from 'nodemailer';
import { IParseMailTemplate } from './HandlebarsMailTemplate';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';
import AppError from '@shared/errors/AppError';

interface IMailContact {
  name: string;
  email: string;
}
interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({
    to,
    templateData,
    from,
    subject,
  }: ISendMail): Promise<void> {
    try {
      const mailTemplate = new HandlebarsMailTemplate();
      const account = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      const message = await transporter.sendMail({
        from: {
          name: from?.name || 'equipe dev',
          address: from?.email || 'equipe@apivendas.com.br',
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await mailTemplate.parse(templateData),
      });

      console.log('Message sent: %s', message.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    } catch {
      throw new AppError('Email server is off');
    }
  }
}
