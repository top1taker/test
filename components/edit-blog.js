import {Button, FloatingLabel, Form, Spinner} from 'react-bootstrap'
import {toBase64} from '../utils/toBase64'
import {useEffect, useState} from 'react'
import {blogApi} from '../api/blogApi'
import Image from 'next/image'

export default function EditBlog({blogId, onDone}) {
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(false)

  const handleFileChange = async (file) => {
    try {
      const data64 = await toBase64(file)
      setForm((form) => ({...form, image: data64}))
    } catch (e) {
      console.log('failed to load')
    }
  }

  const edit = () => {
    setLoading(true)
    blogApi
      .update(form)
      .then(onDone)
      .catch(() => console.log('err'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (blogId != null) {
      blogApi
        .getById(blogId)
        .then((res) => setForm((form) => ({...form, ...res.data})))
        .catch((err) => console.log('get err'))
    }
  }, [blogId])
  console.log('form', form)
  const {image} = form
  return (
    <>
      <Form.Group controlId='formFileSm' className='mb-3'>
        <Image
          className='bg-info'
          src={
              ((image + '').startsWith('data:') && image) ||
            `/api/imageproxy?url=${encodeURIComponent(image)}`
          }
          width={500}
          height={350}
        />
        <Form.Control
          type='file'
          size='sm'
          onChange={({
            target: {
              files: [file],
            },
          }) => handleFileChange(file)}
        />
      </Form.Group>

      <FloatingLabel controlId='floatingTitle' label='Title' className='mb-4'>
        <Form.Control
          type='text'
          placeholder='Your Title'
          value={form.title}
          onChange={({target: {value}}) =>
            setForm((form) => ({...form, title: value}))
          }
        />
      </FloatingLabel>

      <FloatingLabel
        controlId='floatingContent'
        label='Content'
        className='mb-4'>
        <Form.Control
          as='textarea'
          placeholder='Leave a comment here'
          style={{height: 100}}
          value={form.content}
          onChange={({target: {value}}) =>
            setForm((form) => ({...form, content: value}))
          }
        />
      </FloatingLabel>

      <div className='d-flex justify-content-end my-5'>
        <Button
          variant='primary'
          disabled={loading}
          onClick={!loading ? edit : null}>
          {loading ? (
            <Spinner
              as='span'
              animation='border'
              size='sm'
              role='status'
              aria-hidden='true'
            />
          ) : (
            'Save'
          )}
        </Button>
      </div>
    </>
  )
}
