import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import express from "express";
import { getReadings } from "./src/getReadings";
import { query } from "./src/db";

const app = express();
const PORT = process.env.PORT || 3001;
const insertIntoReadings =
  'INSERT INTO "temperatures".readings(device, temperature, timestamp) VALUES ($1, $2, $3)';

const saveToDb = async (req: any, res: any) => {
  try {
    const date = new Date();

    await query(insertIntoReadings, [
      "AB230RF",
      24.56,
      Math.floor(date.getTime() / 1000),
    ]);
    res.send({ status: "ok" });
  } catch (e) {
    console.log(e);
  }
};

// const port = new SerialPort({
//   path: "/dev/tty.usbserial-2110",
//   baudRate: 9600,
// });

// const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));
// parser.on("data", saveToDb);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/readings", getReadings);
app.post("/readings", saveToDb);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
