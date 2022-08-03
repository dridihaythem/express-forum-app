import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Home() {
	const auth = useSelector((state) => state.auth.auth);

	return (
		<>
			<Helmet>
				<title>MERN FORUM</title>
			</Helmet>
			<div>
				{auth && (
					<Link to='/posts/create' className='btn btn-danger'>
						Create new post
					</Link>
				)}
			</div>
		</>
	);
}
