import * as path from "path";
import * as winston from "winston";
import {LogLevel} from "./LogLevel";

export class WinstonLogger {
  public static DEFAULT_SCOPE = "app";

  private readonly scope: string;

  constructor(scope?: string) {
    this.scope = WinstonLogger.parsePathToScope(scope ? scope : WinstonLogger.DEFAULT_SCOPE);
  }

  public debug(message: string, ...args: any[]): void {
    this.log(LogLevel.Debug, message, args);
  }

  public info(message: string, ...args: any[]): void {
    this.log(LogLevel.Info, message, args);
  }

  public warn(message: string, ...args: any[]): void {
    this.log(LogLevel.Warn, message, args);
  }

  public error(message: string, ...args: any[]): void {
    this.log(LogLevel.Error, message, args);
  }


  private log(level: LogLevel, message: string, args: any[]): void {
    if (winston) {
      winston[level](`${this.formatScope()} ${message}`, args);
    }
  }

  private formatScope(): string {
    return `[${this.scope}]`;
  }

  private static parsePathToScope(filepath: string): string {
    if (filepath.indexOf(path.sep) >= 0) {
      filepath = filepath.replace(process.cwd(), "");
      filepath = filepath.replace(`${path.sep}src${path.sep}`, "");
      filepath = filepath.replace(`${path.sep}dist${path.sep}`, "");
      filepath = filepath.replace(".ts", "");
      filepath = filepath.replace(".js", "");
      filepath = filepath.replace(path.sep, ":");
    }

    return filepath;
  }
}
