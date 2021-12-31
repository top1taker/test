import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  pending: false,
  list: [],
  error: false,
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    fetchList(state) {
      state.pending = true
    },
    fetchListSuccess(state, action) {
      state.pending = false
      state.list = action.payload
    },
    fetchListFailed(state) {
      state.pending = false
      state.error = true
    },
  },
})

// Actions
export const blogActions = blogSlice.actions

// Selectors
export const selectBlogList = (state) => state.blogs.list
export const selectBlogPending = (state) => state.blogs.pending
export const selectBlogError = (state) => state.blogs.error

// Reducer
export default blogSlice.reducer
