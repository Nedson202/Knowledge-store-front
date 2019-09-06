import { parseISO, formatDistance, } from 'date-fns';

const timeParser = (date) => {
  try {
    const convertedTime = formatDistance(parseISO(date), new Date(), {
      addPrefix: false,
      addSuffix: true,
    });

    const stripAboutPrefix = convertedTime.replace('about ', '');

    return stripAboutPrefix;
  } catch (error) {
    console.log(error);
  }
};

export default timeParser;
