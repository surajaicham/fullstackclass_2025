const winston = require('winston');
require('winston-daily-rotate-file');

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

const errorTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  maxSize: '10k',       // Rotate after 10KB
  maxFiles: '14d',      // Keep logs for 14 days
  zippedArchive: true   // Compress rotated files
});

const combinedTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  level: 'info',
  maxSize: '10k',       // Rotate after 10KB
  maxFiles: '14d',      // Keep logs for 14 days
  zippedArchive: true   // Compress rotated files
});

const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    errorTransport,
    combinedTransport
  ]
});

// Also log to console in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

module.exports = logger;