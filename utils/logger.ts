import pinoLogger from 'pino';
import pinoPretty from 'pino-pretty';

const logger = pinoLogger(
  pinoPretty({
    colorize: true,
  })
);

export default logger;
