import {useEffect, useState} from 'react'
import {Pagination} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {
  blogPaginationActions,
  blogPaginationSelectors,
} from '../features/blog-pagination/slice'
import {blogActions} from '../features/blog/slice'

export default function CustomPagination() {
  const dispatch = useDispatch()
  const page = useSelector(blogPaginationSelectors.selectPage)
  const limit = useSelector(blogPaginationSelectors.selectLimit)
  const totalCount = useSelector(blogPaginationSelectors.selectTotalCount)
  const params = useSelector(blogPaginationSelectors.selectParams)
  const numberOfPages = Math.ceil(totalCount / limit)
  const remainder =
    numberOfPages > 10 ? Math.min(Math.max(1, page - 5), numberOfPages - 10) : 1
  const amount = Math.min(numberOfPages, 11)

  const setPage = (page) => dispatch(blogPaginationActions.changePage(page))
  const setLimit = (limit) => dispatch(blogPaginationActions.changeLimit(limit))

  const previous = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const next = () => {
    if (page < numberOfPages) {
      setPage(page + 1)
    }
  }

  useEffect(() => {
    dispatch(blogActions.fetchList(params))
  }, [page, limit])
  console.log('number of pages', numberOfPages)
  return (
    <>
      {numberOfPages > 1 && (
        <div className='d-flex align-items-center m-3'>
          <Pagination className='shadow rounded' size='lg'>
            <Pagination.First onClick={() => setPage(1)} disabled={page == 1} />
            <Pagination.Prev onClick={previous} disabled={page == 1} />
            {[...Array(amount)].map((_, index) => (
              <Pagination.Item
                key={index * Math.random()}
                onClick={() => setPage(index + remainder)}
                active={index + remainder == page}>
                {index + remainder}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={next} disabled={page == numberOfPages} />
            <Pagination.Last
              onClick={() => setPage(numberOfPages)}
              disabled={page == numberOfPages}
            />
          </Pagination>
          <div className='m-4'>
            Limit:{' '}
            <select
              className='m-4'
              onChange={({target: {value}}) => {
                setLimit(+value)
                setPage(1)
              }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      )}
    </>
  )
}
