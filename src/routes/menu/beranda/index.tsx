import { component$ } from '@builder.io/qwik';
import { UserActive } from '../dashboard/components/UserActive';

export default component$(() => {
  return (
    <div class='container'>
      <UserActive />
    </div>
  );
});