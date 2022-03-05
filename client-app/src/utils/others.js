import format from 'date-fns/format'


export function formatDateTime(date) { // date format Mon Feb 27 2017 18:33:38 GMT+0000 (UTC)
    return format(date, 'dd/MM/yyyy', { weekStartsOn: 1})
}