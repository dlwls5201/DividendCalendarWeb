import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Auth from 'routes/Auth'
import UserHistory from 'routes/UserHistory'
import UserDetailHistory from 'routes/UserDetailHistory'
import StockRanking from 'routes/StockRanking'

const AppRouter = ({isAdmin, userObj}) => {
  return <Router>
    { isAdmin ? (
      <Switch>
        <Route exact path="/">
          <UserHistory />
        </Route>
        <Route exact path="/user/detail">
          <UserDetailHistory />
        </Route>
        <Route exact path="/stock/ranking">
          <StockRanking userObj={ userObj } />
        </Route>
        <Route render={ () => <div>Page Not Found</div> } />
      </Switch>
    ) : (
        <Switch>
          <Route exact path="/">
            <Auth userObj={ userObj } />
          </Route>
          <Route render={ () => <div>Page Not Found</div> } />
        </Switch>
      )
    }
  </Router>
}

export default AppRouter
