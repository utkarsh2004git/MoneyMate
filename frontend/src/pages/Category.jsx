import React from 'react'
import Dashboard from '../components/Dashboard'
import useUser from '../hooks/useUser'

const Category = () => {
  useUser();
  return (
    <div>
      <Dashboard activeMenu={"Category"}>
        This is Category page.
      </Dashboard>
    </div>
  )
}

export default Category
