import './App.css';
import Post from './comonents/Post'
import Login from './comonents/Login'
import Registre from './comonents/Registre'
import AddNews from './comonents/AddNews';
import { BrowserRouter,Route, Switch } from 'react-router-dom';
import Profile from './comonents/Profile';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login}/>
        <Route path='/registre' exact component={Registre}/>
        <Route path='/news' exact component={Post}/>
        <Route path='/addnew' exact component={AddNews}/>
        <Route path='/profile' exact component={Profile}/>
      </Switch>
    </BrowserRouter>  
    </div>
  );
}

export default App;
