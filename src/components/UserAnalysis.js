const UserAnalysis = ({userList}) => {

  //2021
  const condition2021OctoberStart = new Date('2021.10.01').getTime()
  const condition2021NovemberStart = new Date('2021.11.01').getTime()
  const condition2021DecemberStart = new Date('2021.12.01').getTime()

  //2022
  const condition2022JanuaryStart = new Date('2022.01.01').getTime()

  const get2021DecemberSignInUser = () => {
    return userList.filter(user => {
      return user.created_at >= condition2021DecemberStart && user.created_at < condition2022JanuaryStart
    }).length
  }

  const get2021NovemberSignInUser = () => {
    return userList.filter(user => {
      return user.created_at >= condition2021NovemberStart && user.created_at < condition2021DecemberStart
    }).length
  }

  const get2021OctoberSignInUser = () => {
    return userList.filter(user => {
      return user.created_at >= condition2021OctoberStart && user.created_at < condition2021NovemberStart
    }).length
  }

  return (
    <div
      className={ 'py-2 mt-2 bg-gray-200' }
      style={ {display: 'flex', flexDirection: 'column'} }
    >
      <p className={ 'font-bold' }>UserAnalysis</p>

      <p className={ 'mt-4' }>{ '총 가입 유저 수 : ' + userList.length }</p>

      <p className={ 'mt-4 font-bold' }> 2021 월별 시기 </p>

      <p className={ 'mt-1' }>{ '10월 : ' + get2021OctoberSignInUser() } </p>
      <p className={ 'mt-1' }>{ '11월 : ' + get2021NovemberSignInUser() } </p>
      <p className={ 'mt-1' }>{ '12월 : ' + get2021DecemberSignInUser() } </p>
    </div>
  )
}

export default UserAnalysis