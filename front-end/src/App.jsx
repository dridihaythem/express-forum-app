import React, { Suspense, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Layout/Navbar';
import Loading from './components/UI/Loading';
import Home from './pages/Home';

const PageNotFound = React.lazy(() => import('./pages/PageNotFound'));

export default function App() {
	const location = useLocation();

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
						<Route path='*' element={<PageNotFound />}></Route>
					</Routes>
				</Suspense>
			</div>
		</>
	);
}
