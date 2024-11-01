import mysql from "mysql2";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const dbConfig = {
	host: "localhost",
	user: process.env.DBCONFIG_USER,
	password: process.env.DBCONFIG_PASSWORD,
	database: process.env.DBCONFIG_DATABASE,
};

export const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
	if (err) {
		return console.error("Erro ao conectar ao banco de dados: ", err.message);
	}
	console.log("Conectado ao banco de dados.");
});

export const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});

transporter.verify((error, success) => {
	if (error) {
		console.error("Erro na configuração do transporte:", error);
	} else {
		console.log("Transporte configurado corretamente:", success);
	}
});
