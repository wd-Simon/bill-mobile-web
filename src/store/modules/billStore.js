// 账单列表相关store
import { createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const billStore = createSlice({
  name: 'bill',
  // 数据状态
  initialState: {
    billList: [],
  },
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload
    }
  }
})

// 解构actionCreater 函数
const { setBillList } = billStore.actions
// 编写异步的方法
const getBillList = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:8888/ka')
    dispatch(setBillList(res.data))
  }
}

export {
  getBillList,
}

const reducer = billStore.reducer
export default reducer