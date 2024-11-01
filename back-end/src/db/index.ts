import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
	host: "localhost",
	user: process.env.DBCONFIG_USER,
	password: process.env.DBCONFIG_PASSWORD,
	database: process.env.DBCONFIG_DATABASE,
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
	if (err) {
		return console.error("Erro ao conectar ao banco de dados: ", err.message);
	}
	console.log("Conectado ao banco de dados.");
});

export default connection;
