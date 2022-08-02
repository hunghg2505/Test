import TestRenderer from 'react-test-renderer';
import Test from './Test';

it('Test App', () => {
  const component = TestRenderer.create(<Test />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
