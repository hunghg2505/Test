import useInitBase from 'hooks/useInitBase';
import MasterRoute from 'routing/master-routes.routing';

function App() {
  useInitBase();

  return <MasterRoute />;
}

export default App;
