import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from 'DWFirebase'
import StockItem from 'components/StockItem'

const StockAnalysisWithUser = ({userId}) => {

  const [stockList, setStockList] = useState([])

  useEffect(async () => {
    const stocksRef = collection(firestore, 'stocks')
    const stocksQuery = query(stocksRef, where('userId', '==', userId))
    const stocksSnapshot = await getDocs(stocksQuery)
    const stocks = stocksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    setStockList(stocks)
  }, [])

  return (
    <div
      style={ {display: 'flex', flexDirection: 'column'} }
    >
      <p className={ 'mt-8 text-2xl font-bold' }>Stock Analysis</p>
      <p className={ 'mt-2' }>
        { 'total stock cnt : ' + stockList.length}
      </p>

      <table
        id='stockTable'
        className={ 'table-auto w-full border-collapse border border-black mt-8' }
      >
        <thead>
        <tr className={ 'bg-blue-200' }>
          <th>Logo</th>
          <th>CompanyName</th>
          <th>Ticker</th>
          <th>Count</th>
        </tr>
        </thead>
        <tbody>
        { stockList.map((stock) => <StockItem stock={ stock } />) }
        </tbody>
      </table>
    </div>
  )
}

export default StockAnalysisWithUser