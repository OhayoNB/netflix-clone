import { Movie } from 'models/Movie'
import React, { useEffect, useState } from 'react'
import axios from '../services/axios.service'
import { requests } from '../services/request.service'

interface Props {}

export const Nav: React.FC<Props> = () => {
  const [show, handleShow] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function handleScroll() {
    if (window.scrollY > 100) {
      handleShow(true)
    } else {
      handleShow(false)
    }
  }
  return (
    <div className={`nav ${show && 'nav-black'}`}>
      <img
        className="nav-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
        alt="Netflix Logo"
      />

      <img
        className="nav-avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Avatar"
      />
    </div>
  )
}
