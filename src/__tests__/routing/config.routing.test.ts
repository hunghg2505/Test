import configRoutes from 'routing/config.routing';
import { routePath } from 'routing/path.routing';

test('Test Config Routing', () => {
  expect(configRoutes).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ path: routePath.HomePage }),
      expect.objectContaining({ path: routePath.Auth }),
      expect.objectContaining({ path: routePath.ProfileHash }),
      expect.objectContaining({ path: '*' }),
    ]),
  );
});
