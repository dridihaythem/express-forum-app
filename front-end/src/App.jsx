import React, { Suspense, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Layout/Navbar';
import Loading from './components/UI/Loading';
import AuthGuard from './guards/AuthGuard';
import Home from './pages/Home';
import ShowPost from './pages/posts/ShowPost';
import { autoLogin } from './store/auth';

const Register = React.lazy(() => import('./pages/auth/Register'));
const Login = React.lazy(() => import('./pages/auth/Login'));

const CreatePost = React.lazy(() => import('./pages/posts/CreatePost'));

const PageNotFound = React.lazy(() => import('./pages/PageNotFound'));

export default function App() {
	const dispatch = useDispatch();
	const location = useLocation();

	// auto login
	useEffect(() => {
		dispatch(autoLogin());
	}, []);

	// toggle menu when page changed
	const menu = useRef();
	useEffect(() => {
		menu.current.classList.remove('show');
	}, [location]);

	return (
		<>
			<Navbar ref={menu} />
			<div className='container'>
				<Suspense fallback={<Loading />}>
					<Routes>
						<Route path='/' element={<Home />}></Route>
						<Route path='/auth/register' element={<Register />}></Route>
						<Route path='/auth/login' element={<Login />}></Route>
						<Route
							path='/posts/create'
							element={
								<AuthGuard>
									<CreatePost />
								</AuthGuard>
							}
						></Route>
						<Route path='/posts/:slug' element={<ShowPost />}></Route>
						<Route path='*' element={<PageNotFound />}></Route>
					</Routes>
				</Suspense>
			</div>
		</>
	);
}
