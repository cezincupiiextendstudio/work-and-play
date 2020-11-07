/*
 * Task Messages
 *
 * This contains all the text for the Task component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Task';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Task component!',
  },
});
