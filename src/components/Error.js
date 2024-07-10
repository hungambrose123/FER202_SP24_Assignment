import React from 'react'

const Error = () => {
  return (
    <div className='container p-3 text-center' style={{minHeight: '70vh'}}>
      <div className='display-2 text-danger'><i class="fa-solid fa-circle-exclamation"></i></div>
      <h1>This page does not exist</h1>
    </div>
  )
}

export default Error