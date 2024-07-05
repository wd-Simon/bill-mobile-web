import classNames from "classnames"
import { useMemo } from "react"
import './index.scss'

function DayBill({date, billList}) {
  console.log(date, billList)
  const dayTotal = useMemo(() => {
    // 支出/收入/结余
    const payTotal =  billList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
      const incomeTotal = billList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
      return {
        payTotal,
        incomeTotal,
        balance: incomeTotal + payTotal,
      }
  }, [billList])

  return (
    <div className={classNames('dayBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayTotal.payTotal.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayTotal.incomeTotal.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">333</span>
            <span className="type">{dayTotal.balance.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DayBill