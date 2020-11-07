import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the activitiesPage state domain
 */

const selectActivitiesPageDomain = state =>
  state.activitiesPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ActivitiesPage
 */

const makeSelectActivitiesPage = () =>
  createSelector(
    selectActivitiesPageDomain,
    substate => substate,
  );

export default makeSelectActivitiesPage;
export { selectActivitiesPageDomain };
