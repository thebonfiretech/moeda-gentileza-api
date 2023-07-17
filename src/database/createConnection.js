import mongoose from 'mongoose';
import logger from "../utils/logger.js";
import chalk from 'chalk'
import config from '../config/default.js';
export const connectToDatabase =  async () => {

    try {
		var { production } = config
        mongoose.set('strictQuery', true)
		await mongoose.connect(production ? process.env.MONGOURI :  process.env.MONGOURI_TEST, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

        logger.success(`Database connection: ${chalk.green('mongoDB')}-${chalk.yellow(production ? 'production' : 'homologation')}.`);
	} catch (error) {
        logger.error(error)
        return ({
            status: "unsuccessful connection",
            error: error,
        })
	}


}