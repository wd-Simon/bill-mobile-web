import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useMemo, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import _ from 'lodash'
import { useSelector } from 'react-redux'

function Month() {
  // 从redux中取数据并按月分组
  const { billList }  = useSelector(state => state.bill)
  // useMemo类似计算属性
  const monthGroup = useMemo(() => {
    // return出去计算后的值
    return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM') )
  }, [billList])

  // 控制时间弹窗的打开和关闭
  const [dateVisible, setDateVisible] = useState(false)
  // 时间显示
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().format('YYYY-MM')
  })

  // 账单列表
  const [currentMonthList, setCurrentMonthList] = useState([])
  // 时间切换, 找到对应月份的数据
  const onDateConfirm = (date) => {
    setDateVisible(false)
    setCurrentDate(dayjs(date).format('YYYY-MM'))
    console.log(monthGroup[currentDate])
    setCurrentMonthList(monthGroup[currentDate])
  }

  // 支出/收入/结余 合计计算
  const moneyTotal = useMemo(() => {
    const payTotal =  currentMonthList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
    const incomeTotal = currentMonthList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
    return {
      payTotal,
      incomeTotal,
      balance: incomeTotal + payTotal,
    }
  }, [currentMonthList])
  console.log(moneyTotal)

  return (
    <div className='monthlyBill'>
      <NavBar className='nav' backIcon={false}>
        月度收支
      </NavBar>
      
      <div className='content'>
        <div className='header'>
          {/* 时间切换区域 */}
          <div className='date' onClick={() => setDateVisible(true)}>
            <span className='text'>{currentDate}月账单</span>
            {/* 根据弹窗打开的状态控制类名, 让箭头向上还是向下 */}
            <span className={classNames('arrow', dateVisible && 'expend')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className='item'>
              <span className='money'>{moneyTotal.payTotal.toFixed(2)} 元</span>
              <span className='type'>支出</span>
            </div>
            <div className='item'>
              <span className='money'>{moneyTotal.incomeTotal.toFixed(2)} 元</span>
              <span className='type'>收入</span>
            </div>
            <div className='item'>
              <span className='money'>{moneyTotal.balance.toFixed(2)} 元</span>
              <span className='type'>结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className='kaDate'
            title="记账日期"
            precision="month"
            visible={dateVisible}
            max={new Date()}
            onCancel={() => setDateVisible(false)}
            onClose={() => setDateVisible(false)}
            onConfirm={val => onDateConfirm(val)}
          />
        </div>
        {/* 明细 */}
        <div className='detailWrapper'>
          { currentMonthList.map((item) => (
            <div key={item.id} className='item'>
              <div className='baseInfo'>
                <span>时间: {item.date}</span>
                <span>类型: {item.type === 'pay' ? '支出' : '收入'}</span>
              </div>
              <div className='moneyInfo'>
                <span>金额: {item.money}元</span>
                <span>备注: {item.userFor}</span>
              </div>
            </div>
          )) }
        </div>
      </div>
    </div>
  )
}

export default Month