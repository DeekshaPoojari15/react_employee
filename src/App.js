import './App.css';
import { Provider } from 'react-redux'
import Store from './redux/Store'
import Login from './components/Login'
import First from './components/First'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Provider store={Store} >
		<Router>
			<Switch>
				<Route exact path="/" >
					<Login />
				</Route>
				<Route  path="/employees" >
					<First />
				</Route>
				
			</Switch>
		</Router>
	</Provider>
  );
}

export default App;
