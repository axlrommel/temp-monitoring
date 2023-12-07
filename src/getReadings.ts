const getRandomTemperature = (initialTemp: number) => {
  return Math.random() * 10 + initialTemp;
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
