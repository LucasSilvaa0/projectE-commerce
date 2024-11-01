import { searchUser } from "../../functions/functions";
import type { Request, Response } from "express";

export default function forgotPasswordRoute(req: Request, res: Response) {
	console.log("Alguém está querendo lembrar da senha. ");

	const userEmail = req.body;

	searchUser(userEmail, res, 1);
}
