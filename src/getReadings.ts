import { query } from "./db";

const getRandomTemperature = (initialTemp: number) => {
  return Math.random() * 10 + initialTemp;
};

const queryLatestReadings =
  'select * from "temperatures".readings where (id, device) in (select max(id) as id, device from  "temperatures".readings group by device);';

export const getReadings = async (req: any, res: any) => {
  try {
    const results = await query(queryLatestReadings, []);
    res.send(results?.rows);
  } catch (e) {
    console.log(e);
    res.send([]);
  }
};

export const getRandomReadings = async (req: any, res: any) => {
  const rightNow = new Date();
  const timeInSecs1 = rightNow.getTime() - 10;
  const timeInSecs2 = rightNow.getTime() - 12;
  res.send([
    {
      deviceId: "AB230RF",
      temperature: getRandomTemperature(24),
      timestamp: timeInSecs1,
    },
    {
      deviceId: "AB234RF",
      temperature: getRandomTemperature(24),
      timestamp: timeInSecs2,
    },
  ]);
};
