import React from 'react'

const CreateQuestion = () => {

    const handleSubmit = () => {
        console.log('create question');
    }
  return (
    <div>
        <h2>Create a Thread</h2>
        <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label className='form-label' htmlFor='thread'>Title / Description</label>
                        <input
                            className='form-control'
                            type='text'
                            name='thread'
                            required
                            value=''
                        />
                    </div>
                    <button className='btn btn-primary'>CREATE QUESTION</button>
                </form>
    </div>
  )
}

export default CreateQuestion