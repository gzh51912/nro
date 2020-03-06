import React from 'react';
import './base.css';
import './App.css';
import { withRouter,Switch,Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Home from '@/components/js/Home';
import Classification from '@/components/js/Classification';
import Chat from '@/components/js/Chat';
import Cart from '@/components/js/Cart';
import Mine from '@/components/js/Mine';
import Menu from '@/components/js/Menu';
import Detail from '@/components/js/Detail';
// import Detail from '@/components/js/Loadable';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="/classification" component={Classification} />
            <Route path="/chat" component={Chat} />
            <Route path="/cart" component={Cart} />
            <Route path="/mine" component={Mine} />
            {/* <Route path="/detail/:goodsid" render={(props)=>{
              return <Detail route={props} /> }} component={Detail} /> */}
            <Route path="/detail/:goodsid" component={Detail} />
            <Route path="/notfound" render={()=><div>404页面</div>}/>
            <Redirect from="/" to="/home" exact/>
            <Redirect  to="/notfound" />
        </Switch>
        <Menu />
      </Router>
    </div>
  );
}
export default withRouter(App);
