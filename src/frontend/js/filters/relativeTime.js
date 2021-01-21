import { formatDistanceToNowStrict } from 'date-fns';

export function relativeTime(value) {
    if (!(value instanceof Date)) {
        value = new Date(value);
    }
    return formatDistanceToNowStrict(
        value,
        {
            addSuffix: true,
        },
    );
}
