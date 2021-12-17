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
  const [isCachingData, setIsCachingData] = useState('')

  const [isShowError, setIsShowError] = useState(false)
  const [totalStockTicker, setTotalStockTicker] = useState(0)
  const [totalStockCount, setTotalStockCount] = useState(0.0)

  useEffect(() => {
    if (checkAdmin(userObj.email)) {
      setIsShowError(false)

      const currentTime = Date.now()
      const localStocks = localStorage.getItem('stocks')
      const localCacheTime = localStorage.getItem('stocks_time')

      const OneDayUnixTime = 86400000
      if (currentTime - JSON.parse(localCacheTime) < OneDayUnixTime && localStocks != null) {
        const list = JSON.parse(localStocks)
        processingData(list)
        setIsCachingData('[Cache]')
      } else {
        setIsCachingData('')
        loadRanking().then(r => console.log(r))
      }
    } else {
      setIsShowError(true)
    }
  }, [])

  const loadRanking = async () => {
    const stocksSnapshot = await getDocs(collection(firestore, 'stocks'))
    const stocks = stocksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))

    processingData(stocks)
    localStorage.setItem('stocks', JSON.stringify(stocks))

    const currentTime = Date.now()
    localStorage.setItem('stocks_time', JSON.stringify(currentTime))
  }

  const processingData = (stocks) => {
    let totalStockCount = 0.0

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
      totalStockCount += parseFloat(stock.count)
    })

    const tempList = []
    tempMap.forEach((value, key) => tempList.push(value))

    setTotalStockTicker(tempMap.size)
    setTotalStockCount(totalStockCount)

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
      <p className={ 'mt-8 text-2xl font-bold' }>{ 'Stock Ranking 👑 ' + isCachingData }</p>

      <p
        className={ 'mt-8 text-gray-600' }
      >
        등록된 총 주식 종류 : <b>{ totalStockTicker }</b><br />
        등록된 총 주식 갯수 : <b>{ totalStockCount }</b><br />
        [테이블 설명] <br />
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