import localStorageUtils, { KeyStorage } from 'utils/local-storage.utils';

test('Test localStorageUtils', () => {
  expect(localStorageUtils.set(KeyStorage.AUTH, '2')).toBe(true);
  expect(localStorageUtils.setObject(KeyStorage.AUTH, 2)).toBe(true);
  expect(localStorageUtils.get(KeyStorage.AUTH)).toEqual('2');
  expect(localStorageUtils.getObject(KeyStorage.AUTH)).toBe(2);
  expect(localStorageUtils.remove(KeyStorage.AUTH)).toBe(undefined);
  expect(localStorageUtils.clear()).toBe(undefined);
});
