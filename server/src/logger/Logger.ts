import { Container } from "typedi";

import { WinstonLogger} from "./WinstonLogger";

export function Logger(scope: string): ParameterDecorator {
  return (object: any, propertyKey: string | symbol, index: number): any => {
    const logger = new WinstonLogger(scope);
    const propertyName = propertyKey ? propertyKey.toString() : "";
    Container.registerHandler({
      object,
      propertyName,
      index,
      value: () => logger
    });
  };
}

export { LoggerInterface } from "./LoggerInterface";
