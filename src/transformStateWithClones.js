'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const resultTable = [];

  for (const x of actions) {
    if (x.type === 'addProperties') {
      if (x.extraData !== null) {
        for (const i in x.extraData) {
          stateCopy[i] = x.extraData[i];
        }
        resultTable.push(stateCopy);
      }
    }

    if (x.type === 'removeProperties') {
      if (x.keysToRemove.length >= 0) {
        for (const i of x.keysToRemove) {
          delete stateCopy[i];
        }
        resultTable.push(stateCopy);
      }
    }

    if (x.type === 'clear') {
      for (const i in stateCopy) {
        delete stateCopy[i];
      }
      resultTable.push(stateCopy);
    }
  }

  return resultTable;
}

module.exports = transformStateWithClones;
