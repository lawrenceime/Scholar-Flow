import { Suspense } from 'react';
import TeachersPage from 'src/features/dashboard/teachers/Teachers';

export default function Teachers() {
  return <Suspense>
    <TeachersPage />;
  </Suspense>


}