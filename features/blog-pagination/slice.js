import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  page: 1,
  limit: 5,
  sortBy: '',
  orderBy: 'asc',
  type: 'search',
  value: '',
  totalCount: 0,
}

const blogPaginationSlice = createSlice({
  name: 'blogPagination',
  initialState,
  reducers: {
    changeTotalCount(state, action) {
      state.totalCount = action.payload || 0
    },
    changePage(state, action) {
      state.page = action.payload || 1
    },
    changeLimit(state, action) {
      state.limit = action.payload || 5
    },
    changeSortBy(state, action) {
      state.sortBy = action.payload || ''
    },
    changeOrderBy(state, action) {
      state.orderBy = action.payload || 'asc'
    },
    changeType(state, action) {
      state.type = action.payload || 'search'
    },
    changeValue(state, action) {
      state.value = action.payload || ''
    },
    reset(state) {
      state = initialState
    },
  },
})

// Actions
export const blogPaginationActions = blogPaginationSlice.actions

// Selectors

const selectTotalCount = (state) => state.blogPagination.totalCount
const selectType = (state) => state.blogPagination.type
const selectValue = (state) => state.blogPagination.value
const selectPage = (state) => state.blogPagination.page
const selectLimit = (state) => state.blogPagination.limit
const selectOrderBy = (state) => state.blogPagination.orderBy
const selectSortBy = (state) => state.blogPagination.sortBy

const selectParams = (state) => {
  const {page, limit, sortBy, orderBy, type, value} = state.blogPagination
  let result = {page, limit}
  if (value) {
    result[type] = value
  }
  if (sortBy) {
    result = {...result, sortBy, orderBy}
  }
  return result
}

export const blogPaginationSelectors = {
  selectParams,
  selectType,
  selectTotalCount,
  selectSortBy,
  selectOrderBy,
  selectPage,
  selectLimit,
  selectValue,
}

// Reducer
export default blogPaginationSlice.reducer
