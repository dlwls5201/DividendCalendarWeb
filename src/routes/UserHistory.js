import React, { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { firestore } from 'DWFirebase'
import OrderBy from 'constant/OrderBy'
import { useHistory } from 'react-router-dom'
import UserAnalysis from 'components/UserAnalysis'
import UserItem from 'components/UserItem'

const UserHistory = () => {
  const history = useHistory()

  const [userList, setUserList] = useState([])
  const [createdAtOrder, setCreatedAtOrder] = useState(OrderBy.DESC)

  useEffect(async () => {
    const usersRef = collection(firestore, 'users')
    const usersQuery = query(usersRef, orderBy('created_at', 'desc'))
    const usersSnapshot = await getDocs(usersQuery)

    //const usersSnapshot = await getDocs(collection(firestore, 'users'))
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    setUserList(users)
  }, [])

  const onClickChangeCreatedAt = () => {
    if (createdAtOrder === OrderBy.ASC) {
      setUserListOrderByCreatedAtDESC()
    } else {
      setUserListOrderByCreatedAtASC()
    }
  }

  const setUserListOrderByCreatedAtDESC = () => {
    setCreatedAtOrder(OrderBy.DESC)
    const sortingUserList = userList.sort(function (a, b) {
      return b.created_at - a.created_at
    })
    setUserList(sortingUserList)
  }

  const setUserListOrderByCreatedAtASC = () => {
    setCreatedAtOrder(OrderBy.ASC)
    const sortingUserList = userList.sort(function (a, b) {
      return a.created_at - b.created_at
    })
    setUserList(sortingUserList)
  }

  const goToStockRanking = () => {
    history.push('/stock/ranking')
  }

  return (
    <div
      style={ {background: 'rgb(255,255,255)'} }
      className={ 'px-5 py-5 w-full h-full text-lg' }
    >
      <div className={ 'text-3xl' }>Dividend Calendar History</div>

      <div
        className={ 'hover:bg-gray-200 mt-8 px-4 py-2 rounded-lg border-solid border-2 border-black' }
        style={ {display: 'inline-block', cursor: 'pointer'} }
        onClick={ goToStockRanking }
      >
        Stock Ranking 👑
      </div>

      <UserAnalysis userList={ userList } />

      <h1 className={ 'mt-4 text-gray-600' }>Profile 탭을 누르면 User 상세로 이동합니다.</h1>

      <table
        className={ 'table-fixed w-full border-collapse border border-black mt-2' }
      >
        <thead>
        <tr className="bg-blue-200">
          <th style={ {width: 50} }>No</th>
          <th>Profile</th>
          <th>Name</th>
          <th>Email</th>
          <th
            style={ {cursor: 'pointer'} }
            onClick={ onClickChangeCreatedAt }
          >
            { 'CreatedAt ' + ((createdAtOrder === OrderBy.ASC) ? '↓' : '↑') }
          </th>
        </tr>
        </thead>

        <tbody>
        { userList.map((user, index) => <UserItem index={ index } user={ user } />) }
        </tbody>
      </table>

      {/*<select
       style={ {backgroundColor: 'transparent'} }
       className={ 'mt-10' }
       onChange={ onSelectUser }
       >
       <option value="" selected="selected">User</option>
       { userList.map((user) => <option value={ user.uid }>{ user.name }</option>) }
       </select>*/ }

    </div>
  )
}

export default UserHistory