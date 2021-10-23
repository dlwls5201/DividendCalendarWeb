import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import iconApp from 'static/images/icon_app.png'
import React from 'react'

const Auth = ({userObj}) => {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()

  const onLoginGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result)
      }).catch((error) => {
      GoogleAuthProvider.credentialFromError(error)
    })
  }

  const onLogoutGoogle = () => {
    const auth = getAuth()
    signOut(auth).then(() => {
      console.log('logout success')
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div
      className={ 'bg-blue-200' }
      style={
        {
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }
      }>
      <p
        className={ 'mt-10 text-2xl font-bold' }
      >
        Dividend Calendar Admin
      </p>

      { userObj
        ?
        <div
          style={ {display: 'flex', alignItems: 'center', flexDirection: 'column'} }
        >
          <img
            className={ 'mt-4 rounded-full' }
            src={ userObj.photoURL } width='150px' height='150px'
          />
          <h1
            className={ 'mt-4 text-xl' }
          >
            { userObj.email }
          </h1>
          <h1
            className={ 'mt-2 text-base text-red-600' }
          >
            인증되지 않은 회원입니다.
          </h1>
          <button
            className="hover:bg-red-800 bg-red-200 w-96 h-10 mt-20 text-black rounded-full text-xs border-2 border-black"
            name="google"
            onClick={ onLogoutGoogle }
          >
            Google Logout <FontAwesomeIcon icon={ faGoogle } />
          </button>
        </div>
        :
        <div
          style={ {display: 'flex', alignItems: 'center', flexDirection: 'column'} }
        >
          <img
            className={ 'mt-4 rounded-full' }
            src={ iconApp } width='150px' height='150px'
          />
          <h1
            className={ 'mt-4 text-xl' }
          >
            구글 로그인 인증
          </h1>
          <h1
            className={ 'mt-2 text-base text-gray-600' }
          >
            인증된 회원만 사용 가능합니다.
          </h1>
          <button
            className="hover:bg-gray-200 bg-white w-96 h-10 mt-20 text-black rounded-full text-xs border-2 border-black"
            name="google"
            onClick={ onLoginGoogle }
          >
            Google Login <FontAwesomeIcon icon={ faGoogle } />
          </button>
        </div>
      }
    </div>
  )
}

export default Auth