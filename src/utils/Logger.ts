import bunyan from "bunyan";
import format from "bunyan-format";

class Logger {
  public Log(name: string) {
    const logger = bunyan.createLogger({
      name,
      level: "debug",
      streams: [
        {
          level: "debug",
          stream: format({
            outputMode: "short",
            color: true,
            levelInString: true,
          }),
        },
      ],
    });
    return logger;
  }
}

export const log: Logger = new Logger();
