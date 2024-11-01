import type { Request, Response } from "express";
import login from "../../functions/login";

export default function loginRoute(req: Request, res: Response) {
	console.log("Alguém está querendo logar a conta.");

	const userScheme = req.body;

	login(userScheme, res);
}
