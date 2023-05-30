import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Detail from './pages/Details/Details'
import Form from './pages/Form/Form'
import Landing from './pages/Landing/Landing'



function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/detail" component={Detail} />
        <Route path="/form" component={Form} />
        <Route path="/" component={Landing} />
      </Switch>
    </Router>
  );
}

export default App;

