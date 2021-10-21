import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import History from 'routes/History'
import UserHistory from 'routes/UserHistory'
import StockRanking from 'routes/StockRanking'

export default () => <Router>
  <Switch>
    <Route exact path="/">
      <History />
    </Route>
    <Route exact path="/user">
      <UserHistory />
    </Route>
    <Route exact path="/stock/ranking">
      <StockRanking />
    </Route>
    <Route render={ () => <div>This Page Is Not Available</div> } />
  </Switch>
</Router>
