import type { Response } from "express";
import { connection } from "../db";

interface NewUserScheme {
	username: string;
	email: string;
	userpassword: string;
}

export default function newUser(newUserScheme: NewUserScheme, res: Response) {
	const listNewUser = [
		newUserScheme.username,
		newUserScheme.email,
		newUserScheme.userpassword,
	];

	connection.query(
		"INSERT INTO users (username, email, userpassword) VALUES (?, ?, ?)",
		listNewUser,
		(err) => {
			if (err == null) console.log("Usuário cadastrado com sucesso.");
		},
	);

	res.send(newUserScheme);
}
