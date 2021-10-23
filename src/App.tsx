import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Navbar} from './modules/navigation'
import {Menu} from './views'
import './styles/App.css'

export const App = (): JSX.Element => (
	<>
		<Router>
			<Navbar />
			<Switch>
				<Route component={Menu} exact={true} path="/" />
			</Switch>
		</Router>
	</>
)
