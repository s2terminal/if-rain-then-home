import { ScheduledHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as cheerio from "cheerio";
import * as axios from "axios";

const JMA_URL = 'https://www.jma.go.jp/jp/yoho/331.html';
const JMA_RAIN_SELECTOR = '#forecasttablefont > tbody > tr:nth-child(2) > td.rain > div > table';
const RAIN_PERCENTAGE_THRESHOLD = Number(process.env.RAIN_PERCENTAGE_THRESHOLD);
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL

export const rain: ScheduledHandler = async (_event, _context) => {
  const rainPercentages = await getRainPercentages();
  const rainPercentage = Math.max(...rainPercentages)
  let message = `降水確率${rainPercentage}%`;
  if (RAIN_PERCENTAGE_THRESHOLD <= Math.max(...rainPercentages)) {
    message += " ※雨が降るので家に居ましょう";
  }

  await axios.post(SLACK_WEBHOOK_URL, { text: message });

  return;
}

const getRainPercentages: () => Promise<number[]> = async () => {
  const response = await axios.get(JMA_URL);
  const re = new RegExp(/^([0-9]+)\%$/, 'i');

  return cheerio.load(response.data)(JMA_RAIN_SELECTOR).text().split('\n').filter(
    line => re.test(line)
  ).map(
    line => Number(re.exec(line)[1])
  );
}
