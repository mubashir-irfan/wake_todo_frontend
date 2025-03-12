import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { getCurrentDateTimeStamp } from '@/shared/utils';

dayjs.extend(utc);

describe('Utils', () => {
  describe('getCurrentDateTimeStamp', () => {
    it('should return the current date and time in the correct format', () => {
      const result = getCurrentDateTimeStamp();
      const now = dayjs().utc();
      const formattedNow = now.format('YYYY-MM-DDTHH:mm:ss[Z]');

      expect(result).toBe(formattedNow);
    });

    it('should return a string', () => {
      const result = getCurrentDateTimeStamp();
      expect(typeof result).toBe('string');
    });

    it('should return a string that matches the DATE_TIME_STAMP_FORMAT', () => {
      const result = getCurrentDateTimeStamp();
      const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
      expect(result).toMatch(regex);
    });

    it('should return a utc time', () => {
      const result = getCurrentDateTimeStamp();
      expect(result.endsWith('Z')).toBe(true);
    });

    it('should return a valid dayjs object', () => {
      const result = getCurrentDateTimeStamp();
      expect(dayjs(result).isValid()).toBe(true);
    });
  });
});
