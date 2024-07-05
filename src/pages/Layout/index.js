import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getBillList } from '@/store/modules/billStore'
import { TabBar } from 'antd-mobile'
import {
  BillOutline,
  AddSquareOutline,
  CalculatorOutline,
} from 'antd-mobile-icons'

import './index.scss'

const tabs = [
  {
    key: '/month',
    title: '月度账单',
    icon: <BillOutline />,
  },
  {
    key: '/new',
    title: '记账',
    icon: <AddSquareOutline />,
  },
  {
    key: '/year',
    title: '年度账单',
    icon: <CalculatorOutline />,
  },
]

function Layout() {
  // 请求列表数据
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBillList())
  }, [dispatch])

  // 路由跳转逻辑
  const navigate = useNavigate()
  const setRouteActive = (path) => {
    console.log(path)
    navigate(path)
  }

  // 获取当前路由
  const location = useLocation()
  const { pathname } = location

  return (
    <div className='layout'>

      {/* 二级路由出口 */}
      <div className='container'>
        <Outlet></Outlet>
      </div>
      
      <div className='footer'>
        {/* 循环tab */}
        <TabBar activeKey={pathname} onChange={setRouteActive}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  )
}

export default Layout