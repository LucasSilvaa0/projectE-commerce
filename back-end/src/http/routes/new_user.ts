import { searchUser } from "../../functions/functions";
import { UserModel } from "../models";
import type { Request, Response } from "express";

export default function newUserRoute(req: Request, res: Response) {
	console.log("Alguém está tentanto criar um novo usuário!");

	const newUserScheme = req.body;

	const result = UserModel.safeParse(newUserScheme);
	if (result.success) {
		console.log("Validação bem-sucedida:", result.data);
		searchUser(newUserScheme, res, 0);
	} else {
		console.log("Erro de validação:", result.error.errors);
	}
}
