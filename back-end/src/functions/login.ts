import type { Response } from "express";
import { connection } from "../db";

interface UserScheme {
	email: string;
	userpassword: string;
}

export default function login(userScheme: UserScheme, res: Response) {
	console.log(userScheme);

	connection.query(
		"SELECT * FROM users WHERE email = ?",
		[userScheme.email],
		(err, results: any) => {
			if (err !== null) {
				console.log("Ocorreu um erro, ", err);
				res.send(err);
			} else if (userScheme.userpassword === results[0].userpassword) {
				console.log("A tentativa de login foi concluída com sucesso.");
				res.send(results);
			} else {
				console.log("O email ou a senha estão incorretos.");
				res.send("Login incorreto.");
			}
		},
	);
}
