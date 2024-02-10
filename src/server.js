import chalk from 'chalk';
import https from 'https';
import log from 'gulog';
import fs from 'fs';

import config from './config/default.js'
import { app } from './app.js';

log.setup({
    prefix: '(Gentileza API)',
});


const PORT = process.env.PORT || 7070
const server = app.listen(PORT, async (a) => {
    log.info(`🚀 Server iniciado em ${chalk.cyan('http://localhost:')}${chalk.cyan(process.env.PORT || 6060)}.`);
});

if (config.onHttpsServer) {

    const serverHttps = https.createServer({
        cert: fs.readFileSync('src/config/ssl/code.pem'),
        key: fs.readFileSync('src/config/ssl/key.pem')
    }, app).listen(9090, (a) => {
        log.info(`🚀 Server https iniciado em ${chalk.cyan(9090)}.`);
    })

}

process.on('SIGINT', () => {
    server.close()
    serverHttps.close()
    log.error('App finalizado')
})