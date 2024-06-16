const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export const formattedNiceDate = (date: Date) => {
  return date.toLocaleDateString('en', options);
};

export const formattedSimpleDate = (date: Date) => {
  return date.toLocaleDateString('en');
};
