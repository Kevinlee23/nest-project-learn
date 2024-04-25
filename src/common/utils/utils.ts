export const getServiceTime = (): {
  createDate: string;
  createTime: string;
} => {
  const date = new Date();
  const createDate = `${date.getFullYear()}-${date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}-${date.getDate()}`;

  const createHour =
    date.getHours() > 10 ? date.getHours() : '0' + date.getHours();
  const createMinit =
    date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes();
  const createSec =
    date.getSeconds() > 10 ? date.getSeconds() : '0' + date.getSeconds();
  const createTime = `${createDate} ${createHour}:${createMinit}:${createSec}`;

  return { createDate, createTime };
};
