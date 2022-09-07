import configRoutes from 'routing/config.routing';
// import { routePath } from 'routing/path.routing';

test('Test Config Routing', () => {
  expect(configRoutes).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ path: expect.any(String) }),
      expect.objectContaining({ path: expect.any(String) }),
      expect.objectContaining({ path: expect.any(String) }),
      expect.objectContaining({ path: expect.any(String) }),
    ]),
  );
});
