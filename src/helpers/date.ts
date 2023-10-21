const getTimestamp = (date: Date) => {
  const timestamp = date.getTime() / 1000;

  return timestamp;
};

const getDateFromTimestamp = (timestamp: number) => {
  const currentTimestamp = new Date(timestamp).getTime() * 1000;

  return new Date(currentTimestamp);
};

export { getTimestamp, getDateFromTimestamp };
