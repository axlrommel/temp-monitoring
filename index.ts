import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import express from "express";
import { getReadings } from "./src/getReadings";

const app = express();
const PORT = process.env.PORT || 3001;

const saveToDb = (data: any) => {
  try {
    const rightNow = new Date();
    const obj = JSON.parse(data);
    console.log(obj, rightNow);
  } catch (e) {
    console.log(e);
    console.log(data);
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

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
