import { getUserLocale, setUserLocale } from '@/services/locale';
import { cookies } from 'next/headers';
import { defaultLocale } from '@/i18n/config';
import '@testing-library/jest-dom';

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

describe('Locale Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getUserLocale should return locale from cookies if set', async () => {
    const mockCookies = {
      get: jest.fn().mockReturnValue({ value: 'fr' }),
    };
    (cookies as jest.Mock).mockReturnValue(mockCookies);

    const locale = await getUserLocale();
    expect(locale).toBe('fr');
    expect(mockCookies.get).toHaveBeenCalledWith('NEXT_LOCALE');
  });

  test('getUserLocale should return default locale if no cookie is set', async () => {
    const mockCookies = {
      get: jest.fn().mockReturnValue(undefined),
    };
    (cookies as jest.Mock).mockReturnValue(mockCookies);

    const locale = await getUserLocale();
    expect(locale).toBe(defaultLocale);
    expect(mockCookies.get).toHaveBeenCalledWith('NEXT_LOCALE');
  });

  test('setUserLocale should set locale in cookies', async () => {
    const mockCookies = {
      set: jest.fn(),
    };
    (cookies as jest.Mock).mockReturnValue(mockCookies);

    await setUserLocale('ar');

    expect(mockCookies.set).toHaveBeenCalledWith('NEXT_LOCALE', 'ar');
  });
});
