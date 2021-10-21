import { useEffect, useState } from 'react'
import iconUser from 'static/images/icon_user_gray.svg'
import { useHistory } from 'react-router-dom'

const UserItem = ({index, user}) => {
  const history = useHistory()

  const [profile, setProfile] = useState()

  const dateTimeFormat = new Intl.DateTimeFormat('ko-KR', {year: 'numeric', month: '2-digit', day: '2-digit'})

  useEffect(() => {
    if (user.profile_url) {
      setProfile(user.profile_url)
    } else {
      setProfile(iconUser)
    }
  }, [])

  const goToUserHistory = () => {
    history.push({pathname: '/user', state: user})
  }

  return (
    <tr>
      <td
        className={ 'bg-gray-200' }
        style={ {textAlign: 'center'} }
      >
        { index }
      </td>
      <td
        style={ {textAlign: 'center', cursor: 'pointer'} }
        onClick={ goToUserHistory }
      >
        <img src={ profile } width="50px" height="50px" />
      </td>
      <td>{ user.name }</td>
      <td>{ user.email }</td>
      <td
        style={ {textAlign: 'center'} }
      >{ dateTimeFormat.format(user.created_at) }</td>
    </tr>
  )
}

export default UserItem