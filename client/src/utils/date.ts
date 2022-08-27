export const getDayPeriod = (): string => {
  const hours = new Date().getHours();

  if (hours >= 5 && hours <= 12) {
    return 'Доброе утро';
  } else if (hours >= 12 && hours <= 17) {
    return 'Добрый день';
  } else if (hours >= 17 && hours <= 23) {
    return 'Добрый вечер';
  } else {
    return 'Доброй ночи';
  }

  return '';
};
