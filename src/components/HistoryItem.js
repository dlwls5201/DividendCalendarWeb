import { HistoryType, HistoryTypeMap } from 'constant/HistoryType'

const HistoryItem = ({history}) => {

  const dateTimeFormat = new Intl.DateTimeFormat('ko-KR', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})

  const getColor = () => {
    switch (history.type) {
      case HistoryType.USER_LOGIN : {
        return 'bg-green-200'
      }
      case HistoryType.USER_LOGOUT : {
        return 'bg-red-200'
      }
      case HistoryType.STOCK_SYNC : {
        return 'bg-yellow-200'
      }
      case HistoryType.DIVIDEND_GOAL : {
        return 'bg-blue-200'
      }
      default : {
        return ''
      }
    }
  }

  return (
    <tr className={ getColor() }>
      <td>{ HistoryTypeMap.get(history.type) }</td>
      <td>{ history.ticker }</td>
      <td>{ history.count }</td>
      <td>{ history.goal }</td>
      <td>{ dateTimeFormat.format(history.created_at) }</td>
    </tr>
  )
}

export default HistoryItem