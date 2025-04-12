import React from 'react'

function Header() {
  return (
    <div className='d-flex flex-row justify-content-between align-items-center'>
      <h1 className='custom-color-primary fw-bold text-xl'><span className='custom-color-secondary'>P</span>Wallet</h1>
      <div className='d-flex flex-row gap-4 align-items-center p-2 px-4'>
        <a href="Dashboard" className='custom-color-primary fw-bold'>Dashboard</a>
        <a href="Transactions" className='custom-color-primary fw-bold'>Transactions</a>
        <a href="Settings" className='custom-color-primary fw-bold'>Settings</a>
      </div>
    </div>
  )
}

export default Header
