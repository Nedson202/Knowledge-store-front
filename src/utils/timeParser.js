import moment from 'moment';

const timeParser = (date) => {
  const timeCreated = moment(date).format('MM/DD/YYYY @ h:mm a');
  return moment(timeCreated).fromNow();
};

export default timeParser;