import moment from 'moment';

export function prettyPrintDate(date) {
  return moment(date).format('D MMM HH:mm:ss');
}