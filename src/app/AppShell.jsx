import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AppShell({ children }) {
  return (
    <>
      <a href='#main-content' className='skip-link'>Skip to main content</a>
      <nav className='nav' role='navigation' aria-label='Main navigation'>
        <ul className='nav-list'>
          <li><NavLink to='/' className='nav-link' end aria-current={({isActive}) => (isActive ? 'page' : undefined)}>Dashboard</NavLink></li>
          <li><NavLink to='/subjects' className='nav-link' aria-current={({isActive}) => (isActive ? 'page' : undefined)}>Subjects</NavLink></li>
          <li><NavLink to='/analysis' className='nav-link' aria-current={({isActive}) => (isActive ? 'page' : undefined)}>Analysis</NavLink></li>
        </ul>
      </nav>
      <nav className='bottom-nav' role='navigation' aria-label='Bottom navigation'>
        <ul className='bottom-nav-list'>
          <li><NavLink to='/' className='bottom-nav-link' end aria-current={({isActive}) => (isActive ? 'page' : undefined)}>Dashboard</NavLink></li>
          <li><NavLink to='/subjects' className='bottom-nav-link' aria-current={({isActive}) => (isActive ? 'page' : undefined)}>Subjects</NavLink></li>
          <li><NavLink to='/analysis' className='bottom-nav-link' aria-current={({isActive}) => (isActive ? 'page' : undefined)}>Analysis</NavLink></li>
        </ul>
      </nav>
      <main id='main-content' tabIndex='-1'>{children}</main>
    </>
  )
}
