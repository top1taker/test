import {all} from 'redux-saga/effects'
import {blogSaga} from '../features/blog/saga'

export default function* rootSaga() {
  yield all([blogSaga()])
}
