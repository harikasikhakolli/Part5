import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  const toggleVisibility = () => setIsVisible(!isVisible)
  return (
    <div>
      <button style={{ display: isVisible ? 'none' : '' }} onClick={toggleVisibility}>{props.buttonText}</button>
      <div style={{ display: isVisible ? '' : 'none' }}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonText: PropTypes.string.isRequired
}

export default Togglable