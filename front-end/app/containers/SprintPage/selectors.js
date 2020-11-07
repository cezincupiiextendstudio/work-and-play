import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sprintPage state domain
 */

const selectSprintPageDomain = state => state.sprintPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SprintPage
 */

const makeSelectSprintPage = () =>
  createSelector(
    selectSprintPageDomain,
    substate => substate,
  );

export default makeSelectSprintPage;
export { selectSprintPageDomain };
