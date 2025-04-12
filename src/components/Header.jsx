import React from 'react'

function Header() {
  return (
    <div className='d-flex flex-row justify-content-between align-items-center'>
      <h1 className='custom-color-primary fw-bold'><span className='custom-color-secondary'>P</span>Wallet</h1>
      <div className='d-flex flex-row gap-4 rounded custom-bg-primary custom-color-secondary fw-bold shadow align-items-center p-2 px-4'>
        <a href="Dashboard">Dashboard</a>
        <a href="Transactions">Transactions</a>
        <a href="Settings">Settings</a>
      </div>
    </div>
  )
}

export default Header
