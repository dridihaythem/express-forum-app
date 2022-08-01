import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function Home() {
	return (
		<>
			<Helmet>
				<title>MERN FORUM</title>
			</Helmet>
			<div>
				welcome
				<Link to='/posts/create' className='btn btn-danger'>
					Create new post
				</Link>
			</div>
		</>
	);
}
