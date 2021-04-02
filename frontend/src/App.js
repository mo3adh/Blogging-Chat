import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import UserProfile from "./pages/myProfile";

function App() {

  const redire = (route) => {
    if(localStorage.getItem('user'))
      return <Redirect to={route ?? '/home'}/>
    else 
      return <Redirect to='/' />
  }

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <Login />
          {redire()}
        </Route>
        <Route path='/home'>
          <Home />
          {redire('/home')}
        </Route>
        <Route path='/userProfile'>
          <UserProfile />
          {redire('/userProfile')}
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