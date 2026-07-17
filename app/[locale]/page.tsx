import { HomePage } from '../../src/views/home-page/HomeView';
import { Suspense } from 'react';
import { ElementDetail } from '../../src/сomponents/pokemon-detail/ElementDetail';

export default function Page() {
  return (
    <>
      <HomePage />

      <Suspense fallback={null}>
        <ElementDetail />
      </Suspense>
    </>
  );
}
