import Link from 'next/link'
import {useState} from 'react'
import {Button, Card, Spinner} from 'react-bootstrap'
import Drawer from './drawer'
import Image from 'next/image'
import CardSkeleton from './card-skeleton'
import EditBlog from './edit-blog'
import {useRouter} from 'next/router'
import {useDispatch, useSelector} from 'react-redux'
import {
  blogPaginationActions,
  blogPaginationSelectors,
} from '../features/blog-pagination/slice'
import {blogActions} from '../features/blog/slice'

export default function BlogList({list = [], pending}) {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [blogId, setBlogId] = useState(null)
  const params = useSelector(blogPaginationSelectors.selectParams)

  const handleClickEdit = (id) => {
    setBlogId(id)
    setShow(true)
  }

  const onDone = () => {
    setShow(false)
    dispatch(blogPaginationActions.changePage(1))
    dispatch(blogActions.fetchList(params))
  }

  return (
    <>
      {pending ? (
        <div className='d-flex flex-wrap w-100 h-100 my-5'>
          {[...Array(5)].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : list?.length > 0 ? (
        <>
          <div className='d-flex flex-wrap w-100 h-100 my-5'>
            {list.map(({id, title, image, content}) => (
              <Card className='m-3 shadow' key={id} style={{width: '18rem'}}>
                <Image
                  className='bg-info'
                  src={
                    ((image + '').startsWith('data:') && image) ||
                    `/api/imageproxy?url=${encodeURIComponent(image)}`
                  }
                  width='100%'
                  height={200}
                />
                <Card.Body>
                  <Card.Title className='fw-bold text-info'>{title}</Card.Title>
                  <Card.Text>{content}</Card.Text>
                  <Button onClick={() => handleClickEdit(id)} variant='info'>
                    Edit
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
          <Drawer title='Edit' show={show} handleClose={() => setShow(false)}>
            <EditBlog blogId={blogId} onDone={onDone} />
          </Drawer>
        </>
      ) : (
        <div>No data</div>
      )}
    </>
  )
}
