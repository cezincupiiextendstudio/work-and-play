/**
 *
 * Asynchronously loads the component for AboutPage
 *
 */

import loadable from 'utils/loadable';
import React from 'react';
import LoadingIndicator from '../../components/LoadingIndicator';
export default loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});
