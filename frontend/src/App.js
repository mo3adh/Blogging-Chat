import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import MyProfile from "./pages/myProfile";
import UserProfile from "./pages/userProfile";

function App() {

  const redire = (route) => {
    // if(localStorage.getItem('user'))
    //   return <Redirect to={route ?? '/home'}/>
    // else 
    //   return <Redirect to='/' />
    if(!localStorage.getItem('user'))
      return <Redirect to='/' />
    else return 
    
  }

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/'>
          {!localStorage.getItem('user') ? <Login /> : <Home />}
        </Route>
        <Route path='/home'>
          {localStorage.getItem('user') ? <Home /> : <Login />}
        </Route>
        <Route path='/myProfile'>
          {localStorage.getItem('user') ? <MyProfile /> : <Login />}
        </Route>
        <Route path='/userProfile/:id'>
          {localStorage.getItem('user') ? <UserProfile /> : <Login />}
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