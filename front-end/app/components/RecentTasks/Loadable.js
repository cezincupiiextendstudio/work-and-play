/**
 *
 * Asynchronously loads the component for RecentTasks
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
