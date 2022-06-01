import ContainerLayout from 'libraries/layouts/container.layout';
import { Link } from 'react-router-dom';
import { routePath } from 'routing/path.routing';

export default function AboutPage() {
  return (
    <ContainerLayout title="About">
      <Link to={`${routePath.About}/12`}>About Detail</Link>
    </ContainerLayout>
  );
}
