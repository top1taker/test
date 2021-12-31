import {useEffect, useState} from 'react'
import {
  Button,
  DropdownButton,
  FormControl,
  InputGroup,
  Dropdown,
} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {
  blogPaginationActions,
  blogPaginationSelectors,
} from '../features/blog-pagination/slice'
import {blogActions} from '../features/blog/slice'

export default function Search() {
  const dispatch = useDispatch()
  const type = useSelector(blogPaginationSelectors.selectType)
  const value = useSelector(blogPaginationSelectors.selectValue)
  const sortBy = useSelector(blogPaginationSelectors.selectSortBy)
  const orderBy = useSelector(blogPaginationSelectors.selectOrderBy)
  const params = useSelector(blogPaginationSelectors.selectParams)

  const search = () => {
    dispatch(blogPaginationActions.changePage(1))
    dispatch(blogActions.fetchList(params))
  }

  const setType = (type) => dispatch(blogPaginationActions.changeType(type))
  const setValue = (value) => dispatch(blogPaginationActions.changeValue(value))
  const setSortBy = (sortBy) =>
    dispatch(blogPaginationActions.changeSortBy(sortBy))
  const setOrderBy = (orderBy) =>
    dispatch(blogPaginationActions.changeOrderBy(orderBy))

  return (
    <div className='d-flex align-self-start align-items-center w-50 rounded shadow m-3'>
      <InputGroup className='m-3'>
        <DropdownButton
          variant='outline-secondary'
          title={type === 'search' ? 'all' : type}
          id='input-group-dropdown-1'>
          <Dropdown.Item onClick={() => setType('search')}>all</Dropdown.Item>
          <Dropdown.Item onClick={() => setType('title')}>title</Dropdown.Item>
          <Dropdown.Item onClick={() => setType('content')}>
            content
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setType('image')}>image</Dropdown.Item>
        </DropdownButton>
        <FormControl
          aria-label='Text input with dropdown button'
          value={value || ''}
          onChange={({target: {value}}) => setValue(value)}
        />
      </InputGroup>
      <span className='w-25'>Sort by:</span>
      <select
        className='m-4'
        onChange={({target: {value}}) => setSortBy(value)}>
        <option value={''}>all</option>
        <option value={'title'}>title</option>
        <option value={'content'}>content</option>
        <option value={'image'}>image</option>
      </select>
      <span className='w-25'>Order by:</span>
      <select
        className='m-4'
        onChange={({target: {value}}) => setOrderBy(value)}>
        <option value={'asc'}>asc</option>
        <option value={'desc'}>desc</option>
      </select>
      <Button className='m-4' variant='info' onClick={search}>
        Search
      </Button>
    </div>
  )
}
