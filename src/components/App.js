import AppRouter from 'components/Router'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { checkAdmin } from 'constant/CheckAdmin'

function App() {
  const [init, setInit] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserObj(user)
        checkAdminUser(user)
      } else {
        setUserObj(null)
      }
      setInit(true)
    })
  }, [])

  const checkAdminUser = (user) => {
    if (checkAdmin(user.email)) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
  }

  return (
    <div>
      { init ? <AppRouter isAdmin={ isAdmin } userObj={ userObj } /> : 'Initializing...' }
    </div>
  )
}

export default App
