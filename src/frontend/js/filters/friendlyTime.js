import { format } from 'date-fns';

export function friendlyTime(value) {
    if (!(value instanceof Date)) {
        value = new Date(value);
    }

    return format(value, 'EEE MMM do yyyy HH:mm');
}
