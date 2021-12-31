import {useState} from 'react'
import {Button, Offcanvas} from 'react-bootstrap'

export default function Drawer({title, children, show, handleClose}) {
  return (
    <Offcanvas show={show} onHide={handleClose} placement={'end'}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  )
}
