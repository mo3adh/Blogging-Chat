import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import Home from "./pages/home";
import UserPage from "./pages/user";

function App() {

  const redire = (route) => {
    if(localStorage.getItem('user'))
      return <Redirect to={route ?? '/user'}/>
    else 
      return <Redirect to='/' />
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
          {redire()}
        </Route>
        <Route path='/user'>
          <UserPage />
          {redire('/user')}
        </Route>


        <Route path='/*'>
          {redire()}
          <Home />
        </Route>
      </Switch>
    </Router>
  );  
}

export default App;