import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './stylesheets/index.scss';
import App from './javascripts/App';
import registerServiceWorker from './registerServiceWorker';
import {Router,Route,IndexRedirect,hashHistory} from 'react-router'

import store from './redux/store'
import {Provider} from 'react-redux'

//配置路由
import Home from './javascripts/components/home/home'
import Trophy from './javascripts/components/trophy/trophy'
import Category from './javascripts/components/category/category'
import Mine from './javascripts/components/mine/mine'
import Detail from './javascripts/components/detail/detail'
import GameList from './javascripts/components/gameList/gameList'

let routes = <Provider store={store}>
<Router history={hashHistory}>
	<Route path='/' component={App}>
		<IndexRedirect to='home' />
		<Route path='home' component={Home} />
		<Route path='trophy' component={Trophy} />
		<Route path='category' component={Category} />
		<Route path='mine' component={Mine} />
		<Route path='detail/:id' component={Detail} />
		<Route path='list/:id' component={GameList} />
		<Route path='*' component={Home} />
	</Route>
</Router>
</Provider>

ReactDOM.render(
	routes
	,
	document.getElementById('root')
);
registerServiceWorker();