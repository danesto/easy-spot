const getTimestamp = (date: Date) => {
  const timestamp = date.getTime() / 1000;

  return timestamp;
};

const getDateFromTimestamp = (timestamp: number) => {
  const currentTimestamp = new Date(timestamp).getTime() * 1000;

  return new Date(currentTimestamp);
};

const toPrismaDate = (date?: string) => {
  if (date) {
    return `${date}T00:00:00.000Z`;
  }

  return `${new Date().toISOString().split('T')[0]}T00:00:00.000Z`;
};

export { getTimestamp, getDateFromTimestamp, toPrismaDate };
