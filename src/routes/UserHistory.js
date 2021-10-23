import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from 'DWFirebase'
import { HistoryTypeList } from 'constant/HistoryType'
import HistoryItem from 'components/HistoryItem'
import StockAnalysisWithUser from 'components/StockAnalysisWithUser'

const UserHistory = () => {
  const location = useLocation()

  const [historyList, setHistoryList] = useState([])
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')

  const [isShowError, setIsShowError] = useState(false)

  useEffect(async () => {
    try {
      const stateUserid = location.state.uid
      const stateUserName = location.state.name
      setUserId(stateUserid)
      setUserName(stateUserName)

      const historyRef = collection(firestore, 'history')
      //const historyQuery = query(historyRef, where('userId', '==', userId, limit(100)))
      const historyQuery = query(historyRef, where('userId', '==', stateUserid))
      const historySnapshot = await getDocs(historyQuery)
      const histories = historySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setHistoryListOrderByCreatedAtDESC(histories)
      setIsShowError(false)
    } catch (e) {
      setIsShowError(true)
      console.log(e)
    }
  }, [])

  const setHistoryListOrderByCreatedAtDESC = (histories) => {
    const sortingHistoryList = histories.sort(function (a, b) {
      return b.created_at - a.created_at
    })
    setHistoryList(sortingHistoryList)
  }

  const onSelectType = (event) => {
    const {target: {value}} = event
    filterHistoryByType(value)
  }

  function filterHistoryByType(type) {
    const table = document.getElementById('historyTable')
    const trs = table.getElementsByTagName('tr')

    for (let i = 0; i < trs.length; i++) {
      const tdType = trs[i].getElementsByTagName('td')[0]
      if (tdType) {
        const tdTypeText = tdType.textContent || tdType.innerText
        if (tdTypeText.indexOf(type) > -1) {
          trs[i].style.display = ''
        } else {
          trs[i].style.display = 'none'
        }
      }
    }
  }

  return (
    isShowError ?
    <div>
      잘못된 경로 입니다.
    </div> :
    <div
      className={ 'px-5 py-5 text-lg' }
      style={ {display: 'flex', flexDirection: 'column'} }
    >

      <div className={ 'text-3xl font-bold' }>
        { userName }
      </div>

      <StockAnalysisWithUser userId={ userId } />

      <div className={ 'mt-8 font-bold text-2xl' }>History</div>

      <table
        id='historyTable'
        className={ 'table-fixed w-full border-collapse border border-black mt-8' }
      >
        <thead>
        <tr className="bg-blue-200">
          <th>
            <select
              style={ {backgroundColor: 'transparent'} }
              onChange={ onSelectType }
            >
              <option value="" selected="selected">Type</option>
              { HistoryTypeList.map((type) => <option value={ type.value }>{ type.value }</option>) }
            </select>
          </th>
          <th>Ticker</th>
          <th>Count</th>
          <th>Goal</th>
          <th>CreatedAt</th>
        </tr>
        </thead>
        <tbody>
        { historyList.map((history) => <HistoryItem history={ history } />) }
        </tbody>
      </table>
    </div>
  )
}

export default UserHistory