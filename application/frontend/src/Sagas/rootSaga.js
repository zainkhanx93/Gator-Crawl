import { all } from 'redux-saga/effects';
import {
  loginSaga,
  // registerSaga
  //  albumSaga
  // import other watchers from this file
} from './loginSaga';
// import {
//   userSaga,
//   singleUserSaga,
//   deleteUserSaga,
//   editUserSaga
// } from './userSaga';
// import watchers from other files
// import { photoSaga } from './photoSaga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    // registerSaga(),
    // userSaga(),
    // singleUserSaga(),
    // deleteUserSaga(),
    // editUserSaga()
    // albumSaga(),
    // photoSaga()
    // add other watchers to the array
  ]);
}
