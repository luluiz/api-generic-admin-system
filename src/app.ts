import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose, { ConnectionOptions } from 'mongoose';
import { EnvConfig } from './env-config';
import loggerMiddleware from './middlewares/logger.middleware';
import { RouterAbstract } from './utils/router.abstract';

class App {
    public express: express.Application;
    public envConfig = new EnvConfig();

    constructor(routes: RouterAbstract[]) {
        this.envConfig.load();
        this.express = express();
        this.initDatabase();
        this.initMiddlewares();
        this.initRoutes(routes);
    }

    /**
     * Return the server/application
     */
    public getExpress(): express.Application {
        return this.express;
    }

    private initMiddlewares() {
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(helmet());
        this.express.use(loggerMiddleware.log);
    }

    private initDatabase() {
        const {
            DB_MONGO_DATABASE,
            DB_MONGO_HOST,
            DB_MONGO_PORT,
            DB_MONGO_USER,
            DB_MONGO_PASSWORD,
        } = process.env;

        let uri: string = `mongodb://${DB_MONGO_HOST}:${DB_MONGO_PORT}/${DB_MONGO_DATABASE}`;
        // let uri: string = `mongodb://${DB_MONGO_USER}:${DB_MONGO_PASSWORD}@${DB_MONGO_HOST}:${DB_MONGO_PORT}/${DB_MONGO_DATABASE}`;
        let options: ConnectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        };

        mongoose.connect(uri, options)
            .then(value => {
                console.log('MongoDB database connected.');
            })
            .catch(e => {
                console.error('Error connecting to database.', e);
            })
    }

    private initRoutes(routers: RouterAbstract[]) {
        // this.express.use('/api');
        this.express.use('/public', express.static('public'));

        for (let router of routers) {
            this.express.use(router.getRouter());
        }

    }
}

export default App;