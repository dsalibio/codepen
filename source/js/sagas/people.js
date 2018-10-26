import { takeLatest, call, put } from 'redux-saga/effects';

import {
  GET_PEOPLE_START,
  GET_PEOPLE_SUCCESS,
  GET_PEOPLE_ERROR,
} from 'actions/people';
import api from 'api';

function createGetPeople() {
  return function* (options) {
    try {
      const data = yield call(() => api.getPeople(options.id));
      const action = { type: GET_PEOPLE_SUCCESS, data };
      yield put(action);
    } catch (error) {
      const action = { type: GET_PEOPLE_ERROR, error };
      yield put(action);
    }
  };
}

export const getPeople = createGetPeople();

export function* getPeopleWatcher() {
  yield takeLatest(GET_PEOPLE_START, getPeople);
}

export default [
  getPeopleWatcher(),
];
