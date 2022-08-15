import { getTokenInfo, refreshTokenApi, setTokenInfo } from './auth.utils';

test('Test Auth Function', async () => {
  const r = await refreshTokenApi();

  expect(r).toBe(undefined);

  expect(getTokenInfo()).toEqual({});

  expect(setTokenInfo({ token: 'ABC' })).toEqual(undefined);
});
