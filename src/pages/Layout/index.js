import { Outlet } from 'react-router-dom'
import { Button } from 'antd-mobile'

function Layout() {
  return (
    <div>
      <h3>我是Layout</h3>
      {/* 测试全局生效样式 */}
      <Button color='primary'>测试全局</Button>

      {/* 测试局部生效样式 */}
      {/* <div className='puple'>
        <Button color='primary'>测试局部</Button>
      </div> */}

      <Outlet></Outlet>
    </div>
  )
}

export default Layout