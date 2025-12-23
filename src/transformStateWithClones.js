'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
      history.push({ ...currentState });
    } else if (action.type === 'removeProperties') {
      const nextState = { ...currentState };

      for (const key of action.keysToRemove) {
        delete nextState[key];
      }

      currentState = nextState;
      history.push({ ...currentState });
    } else if (action.type === 'clear') {
      currentState = {};
      history.push({ ...currentState });
    }
  }

  return history;
}

module.exports = transformStateWithClones;
