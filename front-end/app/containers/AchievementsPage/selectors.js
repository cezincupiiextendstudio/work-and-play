import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the achievementsPage state domain
 */

const selectAchievementsPageDomain = state =>
  state.achievementsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AchievementsPage
 */

const makeSelectAchievementsPage = () =>
  createSelector(
    selectAchievementsPageDomain,
    substate => substate,
  );

export default makeSelectAchievementsPage;
export { selectAchievementsPageDomain };
