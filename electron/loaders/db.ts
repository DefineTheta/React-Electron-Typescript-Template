import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import ROOT_PATH from 'app-root-path';

class DatabaseManager {
	#connection!: Connection;
	#connectionOptions: ConnectionOptions;

	constructor(options: ConnectionOptions) {
		this.#connectionOptions = options;
	}

	async init(): Promise<void> {
		this.#connection = await createConnection(this.#connectionOptions);
	}

	get connection(): Connection {
		if (this.#connection !== undefined) {
			return this.#connection;
		} else {
			throw new ReferenceError('Database has not been initialized before access');
		}
	}
}

const db = new DatabaseManager({
	type: 'sqlite',
	database: ROOT_PATH + process.env.DEV_DB_PATH,
	logging: false,
});
export default db;
