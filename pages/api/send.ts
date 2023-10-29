import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, message } = req.body;

    // E-mail envoyé à vous
    await resend.emails.send({
      from: 'PlumeChat <support@plumechat.com>',
      to: ["joseph.boyadjian26300@gmail.com"],
      subject: '#Ticket',
      text: `Message de : ${email}\n\n${message}`,
    });

    // E-mail de confirmation envoyé au client
    await resend.emails.send({
      from: 'PlumeChat <support@plumechat.com>',
      to: [email], // Utilisation de l'email du client
      subject: 'Confirmation de votre demande de support technique',
      text: `Bonjour,\n\nNous avons bien reçu votre demande et nous vous répondrons dans les plus brefs délais.\n\nCordialement,\nL'équipe PlumeChat`,
    });

    res.status(200).json({ status: 'success' });
  } catch (error) {
    res.status(400).json(error);
  }
};

export default POST;
