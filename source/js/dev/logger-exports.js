import { createLogger } from 'redux-logger';
import { Iterable } from 'immutable';

const stateTransformer = (state) => {
  const newState = {};

  Object.keys(state).forEach(key => {
    if (Iterable.isIterable(state[key])) {
      newState[key] = state[key].toJS();
    } else {
      newState[key] = state[key];
    }
  });

  return newState;
};

const CLIENT_OPTIONS = {
  // Transform Immutable to the plain JS objects
  stateTransformer,
};

const SERVER_OPTIONS = {
  colors: {
    title: false,
    prevState: false,
    action: false,
    nextState: false,
    error: false,
  },
  stateTransformer: () => '',
  actionTransformer: action => JSON.stringify(action, null, 2),
  errorTransformer: error => JSON.stringify(error, null, 2),
  titleFormatter: (actionJSON, time) => `\n★★ action: ${ JSON.parse(actionJSON).type } @ ${ time }`,
};

const options = process.env.SERVER_RENDER ? SERVER_OPTIONS : CLIENT_OPTIONS;
const logger = createLogger(options);

export default logger;
