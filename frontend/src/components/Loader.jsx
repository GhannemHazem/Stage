import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner animation="border" role="status">
      <span class= 'sr-Only'> Loading...</span>
    </Spinner>
      

    
  )
}

export default Loader