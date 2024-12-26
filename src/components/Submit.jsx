import React from 'react'
import { useFormStatus } from 'react-dom'

const Submit = () => {
const {pending}=useFormStatus()

  return (
    <div>
        <p className="actions">
          <button type="submit" disabled={pending}> {pending?'Submitting...' : 'submit'}</button>
        </p>
    </div>
  )
}

export default Submit
