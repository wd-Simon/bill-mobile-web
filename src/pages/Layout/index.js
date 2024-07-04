import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <h3>我是Layout</h3>
      <Outlet></Outlet>
    </div>
  )
}

export default Layout