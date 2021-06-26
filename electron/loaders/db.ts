import knex, { Knex } from 'knex';

export default function connect(): Knex {
	const dbFilePath = process.env.ROOT_PATH + process.env.DB_PATH;

	const conn = {
		client: 'sqlite3',
		connection: {
			filename: dbFilePath,
		},
	};

	return knex(conn);
}
