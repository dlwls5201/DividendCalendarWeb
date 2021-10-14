export const HistoryTypeList = [
  { name: 'STOCK_ADD', value: "주식 추가"},
  { name: 'STOCK_MODIFY', value: "주식 수정"},
  { name: 'STOCK_DELETE', value: "주식 삭제"},
  { name: 'QUOTE_SEE', value: "주식 시세 보기"},
  { name: 'DIVIDEND_GOAL', value: "목표 배당금 설정"},
]

const getMap = () => {
  const map = new Map();

  HistoryTypeList.forEach(history => {
    map.set(history.name, history.value)
  })

  return map
}

export const HistoryTypeMap = getMap();

