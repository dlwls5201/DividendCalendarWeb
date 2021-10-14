import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import History from 'routes/History'

export default () => <Router>
  <Switch>
    <Route path="/">
      <History />
    </Route>
  </Switch>
</Router>
