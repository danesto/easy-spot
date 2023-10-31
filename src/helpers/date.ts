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

/**
 *
 * @param date stringified date
 * @returns readable friendly date in format "YYY-MM-DD"
 */
const formatDate = (date: string) => {
  const inputDate = new Date(date as string);

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export { getTimestamp, getDateFromTimestamp, toPrismaDate, formatDate };
