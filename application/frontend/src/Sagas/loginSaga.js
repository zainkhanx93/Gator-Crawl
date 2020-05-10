import axios from 'axios';
import {
  call,
  put,
  takeLatest
} from 'redux-saga/effects';
import { Cookies } from 'react-cookie';

import * as actionTypes from '../Store/Actions/actionTypes';
import {
  loginSuccess,
  loginFail
} from '../Store/Actions/loginActions';


function postLoginInfo(values) {
  return axios.post('/api/users/login', values)
    .then((response) => {
      return { response };
    }).catch((error) => {
      return { error };
    });
}

function getByEmail(values) {
  console.log(values);
  return axios.post('/api/users/email', { email: values.email })
    .then((res) => {
      console.log(res);
      return { res };
    }).catch((err) => {
      return { err };
    });
}

function* login(action) {
  try {
    const { response, error } = yield call(postLoginInfo, action.payload.values);
    if (response) {
      console.log('token aquired');
      const { res } = yield call(getByEmail, action.payload.values);
      if (res) {
        console.log('login and fetch succress');
        const currentUser = {
          id: res.data[0].id,
          firstName: res.data[0].firstName,
          lastName: res.data[0].lastName,
          major: res.data[0].major,
          email: res.data[0].email,
          admin: res.data[0].admin
        };
        console.table(currentUser);
        const cookie = new Cookies();
        cookie.set('token', response.data.token);
        cookie.set('email', currentUser.email);
        cookie.set('id', currentUser.id);
        cookie.set('firstName', currentUser.firstName);
        cookie.set('lastName', currentUser.lastName);
        cookie.set('major', currentUser.major);
        cookie.set('admin', currentUser.admin);
        action.payload.callback(true, response.data.token);
        yield put(loginSuccess({ currentUser, token: response.data.token }));
        // yield put(storeCookie({ token: response.data.token}));
      } else {
        console.log('ERRRRROR');
        yield put(loginFail({ message: 'oops' }));
        action.payload.callback(false);
      }
    } else {
      yield put(loginFail({ message: error.message }));
      action.payload.callback(false);
    }
  } catch (e) {
    console.log(e);
  }
}

export function* loginSaga() {
  yield takeLatest(actionTypes.TRY_LOGIN, login);
}
