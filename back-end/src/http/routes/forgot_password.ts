import type { Request, Response } from "express";
import forgotPassword from "../../functions/forgot_password";

export default function forgotPasswordRoute(req: Request, res: Response) {
	console.log("Alguém está querendo lembrar da senha. ");

	const userEmail = req.body.userEmail;

	forgotPassword(userEmail, res);
}
