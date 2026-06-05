import React from 'react'
import Dashboard from '../components/Dashboard'
import useUser from '../hooks/useUser';

const Filter = () => {
  useUser();
  return (
    <div>
      <Dashboard activeMenu={"Filter"}>
        This is Filter page.
      </Dashboard>
    </div>
  )
}

export default Filter
