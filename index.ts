import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import express from "express";
import { getReadings } from "./src/getReadings";
import { query } from "./src/db";

const app = express();
const PORT = process.env.PORT || 3001;
const insertIntoReadings =
  'INSERT INTO "temperatures".readings(device, temperature, timestamp) VALUES ($1, $2, $3)';

interface IReading {
  id: string;
  temp: number;
}

const saveToDb = async (data: string) => {
  try {
    const date = new Date();
    const obj: IReading = JSON.parse(data);

    await query(insertIntoReadings, [
      obj.id,
      obj.temp,
      Math.floor(date.getTime() / 1000),
    ]);
    console.log(data);
  } catch (e) {
    console.log(e);
    console.log(data);
  }
};

const port = new SerialPort({
  path: "/dev/tty.usbserial-2110",
  baudRate: 57600,
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));
parser.on("data", saveToDb);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/readings", getReadings);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
