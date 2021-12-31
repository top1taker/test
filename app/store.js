import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './rootSaga'
import blogReducer from '../features/blog/slice'
import blogPaginationReducer from '../features/blog-pagination/slice'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    blogPagination: blogPaginationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)
