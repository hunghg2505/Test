import { getTokenInfo, refreshTokenApi, setTokenInfo } from './auth.utils';

const mockResponse = jest.fn();
Object.defineProperty(window, 'location', {
  value: {
    hash: {
      endsWith: mockResponse,
      includes: mockResponse,
    },
    assign: mockResponse,
  },
  writable: true,
});

test('Test Auth Function', async () => {
  const r = await refreshTokenApi();

  expect(r).toBe(undefined);

  expect(getTokenInfo()).toEqual({});

  expect(setTokenInfo({ token: 'ABC' })).toEqual(undefined);
});
