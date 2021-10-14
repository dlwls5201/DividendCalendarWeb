import { HistoryTypeMap } from 'constant/HistoryType'

const HistoryItem = ({history}) => {

  const dateTimeFormat = new Intl.DateTimeFormat('ko-KR', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})

  return (
    <tr>
      <td>{ HistoryTypeMap.get(history.type) }</td>
      <td>{ history.ticker }</td>
      <td>{ history.count }</td>
      <td>{ history.goal }</td>
      <td>{ dateTimeFormat.format(history.created_at) }</td>
    </tr>
  )
}

export default HistoryItem