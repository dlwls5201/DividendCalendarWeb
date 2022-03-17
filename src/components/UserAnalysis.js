const UserAnalysis = ({userList}) => {

  //2021
  const condition2021OctoberStart = new Date('2021.10.01').getTime()
  const condition2021NovemberStart = new Date('2021.11.01').getTime()
  const condition2021DecemberStart = new Date('2021.12.01').getTime()

  //2022
  const condition2022JanuaryStart = new Date('2022.01.01').getTime()
  const condition2022FebruaryStart = new Date('2022.02.01').getTime()
  const condition2022MarchStart = new Date('2022.03.01').getTime()
  const condition2022AprilStart = new Date('2022.04.01').getTime()
  const condition2022MayStart = new Date('2022.05.01').getTime()

  const get2022AprilSignInUser = () => {
    return userList.filter(user => {
      return user.created_at >= condition2022AprilStart && user.created_at < condition2022MayStart
    }).length
  }

  const get2022MarchSignInUser = () => {
    return userList.filter(user => {
      return user.created_at >= condition2022MarchStart && user.created_at < condition2022AprilStart
    }).length
  }

  const get2022FebruarySignInUser = () => {
    return userList.filter(user => {
      return user.created_at >= condition2022FebruaryStart && user.created_at < condition2022MarchStart
    }).length
  }

  const get2022JanuarySignInUser = () => {
    return userList.filter(user => {
      return user.created_at >= condition2022JanuaryStart && user.created_at < condition2022FebruaryStart
    }).length
  }

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

      <p className={ 'mt-4 font-bold' }> 2021 신규 가입 유저</p>

      <p className={ 'mt-1' }>{ '10월 : ' + get2021OctoberSignInUser() } </p>
      <p className={ 'mt-1' }>{ '11월 : ' + get2021NovemberSignInUser() } </p>
      <p className={ 'mt-1' }>{ '12월 : ' + get2021DecemberSignInUser() } </p>

      <p className={ 'mt-4 font-bold' }> 2022 신규 가입 유저 </p>

      <p className={ 'mt-1' }>{ '01월 : ' + get2022JanuarySignInUser() } </p>
      <p className={ 'mt-1' }>{ '02월 : ' + get2022FebruarySignInUser() } </p>
      <p className={ 'mt-1' }>{ '03월 : ' + get2022MarchSignInUser() } </p>
      <p className={ 'mt-1' }>{ '04월 : ' + get2022AprilSignInUser() } </p>

    </div>
  )
}

export default UserAnalysis