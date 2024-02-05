import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

function Header({ onAdd, showAddTask , title}) {

  const location = useLocation()

  return (
    <div className='header'>
      <h2 style={{ color: "#070", fontSize: 30 }}
        >{title}</h2>
        {location.pathname === '/' && <button className='btn' style={{backgroundColor: !showAddTask ? "green": "red" }} onClick={onAdd}>{!showAddTask ? 'Add' : 'Close'}</button>}
    </div>
  )
}

Header.defaultProps = {
  title: 'Task Tracker'
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header
