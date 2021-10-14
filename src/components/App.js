import AppRouter from 'components/Router'
import { initFirebase} from 'DWFirebase'

function App() {
  initFirebase()
  return (
    <AppRouter />
  )
}

export default App
