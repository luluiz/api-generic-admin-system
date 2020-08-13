import _ from 'lodash';
import dotenv, { DotenvConfigOptions, DotenvParseOutput } from 'dotenv';
import fs from 'fs';

export class EnvConfig {
    private options: DotenvConfigOptions = {
        path: this.getEnvPath(process.env.NODE_ENV),
        encoding: 'utf8',
    };

    constructor() {

    }

    public load() {
        try {
            const envConfig: DotenvParseOutput = dotenv.parse(fs.readFileSync(this.options.path, <any>this.options.encoding))

            _.each(envConfig, (value, key) => {
                if (process.env[key] === undefined) {
                    process.env[key] = this.interpolate(value, envConfig)
                }
            });

            dotenv.config(this.options);
            console.log('NODE_ENV - ENVIROMENT:', process.env.NODE_ENV);

        } catch (error) {
            return { error }
        }
    }

    /**
     * Retorna o caminho do arquivo de variáveis de ambiente de acordo com o NODE_ENV (ambiente) informado.
     */
    private getEnvPath(enviroment: string): string {
        if (enviroment === "test")
            return ".env.test";
        else if (enviroment === "testing")
            return ".env.testing";
        else if (enviroment === "production")
            return ".env.production"
        else
            return ".env";
    }

    /**
     * Substitui as variáveis do arquivo .env
     * @param {string} env valor da variável
     * @param {object} envConfig configurações
     */
    private interpolate(env: string, envConfig: DotenvParseOutput): string {
        const matches = env.match(/(\\)?\$([a-zA-Z0-9_]+)|(\\)?\${([a-zA-Z0-9_]+)}/g) || []
        _.each(matches, (match) => {
            /**
             * Variable is escaped
             */
            if (match.indexOf('\\') === 0) {
                env = env.replace(match, match.replace(/^\\\$/, '$'))
                return
            }
            const key = match.replace(/\$|{|}/g, '')
            const variable = envConfig[key] || process.env[key] || ''
            env = env.replace(match, this.interpolate(variable, envConfig))
        })
        return env;
    }
}