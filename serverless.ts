import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'if-rain-then-home',
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    region: 'ap-northeast-1',
    runtime: 'nodejs12.x',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      RAIN_PERCENTAGE_THRESHOLD: process.env.RAIN_PERCENTAGE_THRESHOLD,
      SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
    },
  },
  functions: {
    rain: {
      handler: 'handler.rain',
      events: [ { schedule: 'cron(0 22 * * ? *)' } ] // UTC
    }
  }
}

module.exports = serverlessConfiguration;
