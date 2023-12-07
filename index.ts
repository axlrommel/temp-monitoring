import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

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

const port = new SerialPort({
  path: "/dev/tty.usbserial-2110",
  baudRate: 9600,
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));
parser.on("data", saveToDb);
