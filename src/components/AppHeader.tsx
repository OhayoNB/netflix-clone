import { NavLink } from 'react-router-dom'

export const AppHeader = () => {
  return (
    <section className="app-header main-layout full">
      <div className="layout-container">
        <div>Logo</div>
        <nav className="navbar">
          <NavLink end to="/" >Home</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </div>
    </section>
  )
}
