import chalk from "chalk";

import { loggerConfig } from "../../logger.config.js";


const generalPrefix = () => `${chalk[loggerConfig.prefixColor](loggerConfig.prefix)}`

export default class Logger {
  static error(message, field) {
    const error = field ? field : loggerConfig.error;
    const typePrefix = `${chalk[error.prefixColor](error.prefix)}`;
    message = `${chalk[error.messageColor](message)}`
    console.log(`${generalPrefix()} ${typePrefix} ${message}`);
  }

  static info(message, field) {
    const info = field ? field : loggerConfig.info;
    const typePrefix = `${chalk[info.prefixColor](info.prefix)}`;
    message = `${chalk[info.messageColor](message)}`
    console.log(`${generalPrefix()} ${typePrefix} ${message}`);
  }

  static warning(message, field) {
    const warning = field ? field : loggerConfig.warning;
    const typePrefix = `${chalk[warning.prefixColor](warning.prefix)}`;
    message = `${chalk[warning.messageColor](message)}`;
    console.log(`${generalPrefix()} ${typePrefix} ${message}`);
  }

  static success(message, field) {
    const success = field ? field : loggerConfig.success;
    const typePrefix = `${chalk[success.prefixColor](success.prefix)}`;
    message = `${chalk[success.messageColor](message)}`
    console.log(`${generalPrefix()} ${typePrefix} ${message}`);
  }
}
