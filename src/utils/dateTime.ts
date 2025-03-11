import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const DATE_TIME_STAMP_FORMAT = 'YYYY-MM-DDTHH:mm:ss[Z]'

export const getCurrentDateTimeStamp = () => dayjs().utc().format(DATE_TIME_STAMP_FORMAT);