import {call, put, takeLatest} from 'redux-saga/effects'
import {blogApi} from '../../api/blogApi'
import {blogActions} from './slice'
import {blogPaginationActions} from '../blog-pagination/slice'

function* getBlogs({payload: params}) {
  try {
    const {page, limit, ...rest} = params
    const checkTotal = yield call(blogApi.getAll, rest)
    yield put(blogPaginationActions.changeTotalCount(checkTotal.data.length))

    const response = yield call(blogApi.getAll, params)
    yield put(blogActions.fetchListSuccess(response.data))
  } catch (err) {
    console.log('err.response', err)
  }
}

export function* blogSaga() {
  yield takeLatest(blogActions.fetchList.type, getBlogs)
}
