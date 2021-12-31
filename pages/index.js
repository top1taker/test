import {useDispatch, useSelector} from 'react-redux'
import {
  blogActions,
  selectBlogList,
  selectBlogPending,
} from '../features/blog/slice'
import {useEffect, useState} from 'react'
import Search from '../components/search'
import BlogList from '../components/list-blog'
import CustomPagination from '../components/custom-pagination'

export default function Home() {
  const list = useSelector(selectBlogList)
  const pending = useSelector(selectBlogPending)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(blogActions.fetchList({page: 1, limit: 5}))
  }, [])

  return (
    <div className='d-flex flex-column my-5 mx-auto' style={{width: '85%'}}>
      <Search />
      <BlogList list={list} pending={pending} />
      <CustomPagination />
    </div>
  )
}
