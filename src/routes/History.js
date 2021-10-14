import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { firestore } from 'DWFirebase'
import { HistoryTypeList } from 'constant/HistoryType'
import HistoryItem from 'components/HistoryItem'

const History = () => {
  const [userList, setUserList] = useState([])
  const [historyList, setHistoryList] = useState([])
  const [filteredHistoryList, setFilteredHistoryList] = useState([])

  useEffect(async () => {
    const usersSnapshot = await getDocs(collection(firestore, 'users'))
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    setUserList(users)

    const historyRef = collection(firestore, 'history')
    //const historyQuery = query(historyRef, where('type', '==', 'DIVIDEND_GOAL'))
    const historyQuery = query(historyRef, orderBy("created_at", "desc"));
    const historySnapshot = await getDocs(historyQuery)
    const histories = historySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    setHistoryList(histories)
  }, [])

  const onSelectType = (event) => {
    const {target: {value}} = event
    filterHistoryByType(value)
  }

  function filterHistoryByType(type) {
    const table = document.getElementById('historyTable')
    const trs = table.getElementsByTagName('tr')

    for (let i = 0; i < trs.length; i++) {
      const tdType = trs[i].getElementsByTagName('td')[0]
      if(tdType) {
        const tdTypeText = tdType.textContent || tdType.innerText
        if(tdTypeText.indexOf(type) > -1) {
          trs[i].style.display = ''
        } else {
          trs[i].style.display = 'none'
        }
      }
    }
  }

  const onSelectUser = (event) => {
    const {target: {value}} = event
    const filteredList = historyList.filter( history => {
      return history.userId === value
    })
    setFilteredHistoryList(filteredList)
  }

  return (
    <div
      style={ {background: 'rgb(255,255,255)'} }
      className={ 'px-5 py-5 w-full h-full text-lg' }
    >
      <div tw={ 'text-4xl font-bold' }>Dividend Calendar History</div>

      <h1 className="text-blue-400">BlackJin World</h1>

      <select
        style={ {backgroundColor: 'transparent'} }
        className={ 'mt-10'}
        onChange={ onSelectUser }
      >
        <option value="" selected="selected">User</option>
        { userList.map((user) => <option value={ user.uid }>{ user.name }</option>) }
      </select>

      <table
        id='historyTable'
        className={ 'table-fixed w-full border-collapse border border-black mt-4' }
      >
        <thead>
        <tr className="bg-blue-200">
          <th>
            <select
              style={ {backgroundColor: 'transparent'} }
              onChange={ onSelectType }
            >
              <option value="" selected="selected">Type</option>
              { HistoryTypeList.map((type) => <option value={ type.name }>{ type.value }</option>) }
            </select>
          </th>
          <th>Ticker</th>
          <th>Count</th>
          <th>Goal</th>
          <th>CreatedAt</th>
        </tr>
        </thead>
        <tbody>
        { filteredHistoryList.map((history) => <HistoryItem history={ history } />) }
        </tbody>
      </table>
    </div>
  )
}

export default History