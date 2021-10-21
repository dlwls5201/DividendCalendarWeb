export const HistoryType = {
  DIVIDEND_GOAL: 'DIVIDEND_GOAL',

  STOCK_SYNC: 'STOCK_SYNC',
  STOCK_ADD: 'STOCK_ADD',
  STOCK_MODIFY: 'STOCK_MODIFY',
  STOCK_DELETE: 'STOCK_DELETE',

  QUOTE_SEE: 'QUOTE_SEE',
  GUIDE_SEE: 'GUIDE_SEE',
  NOTICE_SEE: 'NOTICE_SEE',

  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT'
}

export const HistoryTypeList = [
  {name: HistoryType.DIVIDEND_GOAL, value: '목표 배당금 설정'},

  {name: HistoryType.STOCK_SYNC, value: '주식 동기화'},
  {name: HistoryType.STOCK_ADD, value: '주식 추가'},
  {name: HistoryType.STOCK_MODIFY, value: '주식 수정'},
  {name: HistoryType.STOCK_DELETE, value: '주식 삭제'},

  {name: HistoryType.QUOTE_SEE, value: '주식 시세 보기'},
  {name: HistoryType.GUIDE_SEE, value: '가이드 보기 클릭'},
  {name: HistoryType.NOTICE_SEE, value: '공지사항 보기 클릭'},

  {name: HistoryType.USER_LOGIN, value: '로그인'},
  {name: HistoryType.USER_LOGOUT, value: '로그아웃'}
]

const getMap = () => {
  const map = new Map()

  HistoryTypeList.forEach(history => {
    map.set(history.name, history.value)
  })

  return map
}

export const HistoryTypeMap = getMap()

