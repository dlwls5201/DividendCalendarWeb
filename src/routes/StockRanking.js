import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from 'DWFirebase'
import OrderBy from 'constant/OrderBy'
import RankingItem from 'components/RankingItem'
import { checkAdmin } from 'constant/CheckAdmin'

const StockRanking = ({userObj}) => {

  const [rankingList, setRankingList] = useState([])
  const [countOrder, setCountOrder] = useState(OrderBy.ASC)
  const [userNumberOrder, setUserNumberOrder] = useState(OrderBy.ASC)
  const [focusOrder, setFocusOrder] = useState('')

  const [isShowError, setIsShowError] = useState(false)

  useEffect(async () => {
    if (checkAdmin(userObj.email)) {
      const stocksSnapshot = await getDocs(collection(firestore, 'stocks'))
      const stocks = stocksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      processingData(stocks)
      setIsShowError(false)
    } else {
      setIsShowError(true)
    }
  }, [])

  const processingData = (stocks) => {
    const tempMap = new Map()
    stocks.forEach(stock => {
      let item = tempMap.get(stock.symbol)
      if (item) {
        item.count += parseFloat(stock.count)
        item.userNumber += 1
      } else {
        item = {
          'symbol': stock.symbol,
          'count': parseFloat(stock.count),
          'userNumber': 1,
          'companyName': stock.companyName,
          'logoUrl': stock.logoUrl
        }
      }
      tempMap.set(stock.symbol, item)
    })

    const tempList = []
    tempMap.forEach((value, key) => tempList.push(value))
    setRankingList(tempList)
  }

  const onClickChangeCountOrderBy = () => {
    setFocusOrder('count')

    if (countOrder === OrderBy.ASC) {
      setCountOrder(OrderBy.DESC)
      const list = rankingList.sort(function (a, b) {
        return b.count - a.count
      })
      setRankingList(list)
    } else {
      setCountOrder(OrderBy.ASC)
      const list = rankingList.sort(function (a, b) {
        return a.count - b.count
      })
      setRankingList(list)
    }
  }

  const onClickChangeUserNumberOrderBy = () => {
    setFocusOrder('userNumber')

    if (userNumberOrder === OrderBy.ASC) {
      setUserNumberOrder(OrderBy.DESC)
      const list = rankingList.sort(function (a, b) {
        return b.userNumber - a.userNumber
      })
      setRankingList(list)
    } else {
      setUserNumberOrder(OrderBy.ASC)
      const list = rankingList.sort(function (a, b) {
        return a.userNumber - b.userNumber
      })
      setRankingList(list)
    }
  }

  return (
    isShowError ?
    <div>
      잘못된 경로 입니다.
    </div> :
    <div
      className={ 'px-4 py-4' }
      style={ {display: 'flex', flexDirection: 'column'} }
    >
      <p className={ 'mt-8 text-2xl font-bold' }>Stock Ranking 👑</p>

      <p
        className={ 'mt-8 text-gray-600' }
      >
        모든 유저의 주식 총 갯수 : <b>Count</b> <br />
        해당 주식을 추가한 모든 유저들의 수 : <b>UserNumber</b>
      </p>

      <table
        id='rankingTable'
        className={ 'table-auto w-full border-collapse border border-black mt-4' }
      >
        <thead>
        <tr className={ 'bg-blue-200' }>
          <th>Logo</th>
          <th>CompanyName</th>
          <th>Ticker</th>
          <th
            style={ {cursor: 'pointer'} }
            className={ (focusOrder === 'count') ? 'bg-yellow-200' : '' }
            onClick={ onClickChangeCountOrderBy }
          >
            { 'Count ' + ((countOrder === OrderBy.ASC) ? '↓' : '↑') }
          </th>
          <th
            style={ {cursor: 'pointer'} }
            className={ (focusOrder === 'userNumber') ? 'bg-yellow-200' : '' }
            onClick={ onClickChangeUserNumberOrderBy }
          >
            { 'UserNumber ' + ((userNumberOrder === OrderBy.ASC) ? '↓' : '↑') }
          </th>
        </tr>
        </thead>
        <tbody>
        { rankingList.map((ranking) => <RankingItem ranking={ ranking } />) }
        </tbody>
      </table>
    </div>
  )
}

export default StockRanking