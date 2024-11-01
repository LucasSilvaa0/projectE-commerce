import type { Response } from "express";
import { connection, transporter } from "../db";

export default function forgotPassword(userEmail: string, res: Response) {
	connection.query(
		"SELECT userpassword FROM users WHERE (email) = (?)",
		[userEmail],
		(err, results: any) => {
			if (err) {
				console.log(`Ocorreu um erro: ${err}`);
				res.send(err);
			} else if (results[0]) {
				res.send(results[0]);
				sendPassword(userEmail, results[0].userpassword);
			} else {
				console.log("Esse email não está cadastrado.");
				res.send("Esse email não está cadastrado.");
			}
		},
	);
}

async function sendPassword(email: string, password: string) {
	try {
		const info = await transporter.sendMail({
			from: '"Ecommerce" donotreplyecommerceproject@gmail.com',
			to: email,
			subject: "Recuperação de senha",
			text: "",
			html: `<p>A senha do email solicitado é: <br><strong>${password}</strong></p>`,
		});

		console.log("Email enviado: ", info.messageId);
	} catch (error) {
		console.error("Erro ao enviar email: ", error);
	}
}
