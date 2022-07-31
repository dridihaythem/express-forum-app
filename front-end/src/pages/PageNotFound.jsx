import React from 'react';
import { Helmet } from 'react-helmet';
import Alert from '../components/UI/Alert';

export default function PageNotFound() {
	return (
		<>
			<Helmet>
				<title>Page Not Found</title>
			</Helmet>
			<Alert type='danger' message='page not found' />
		</>
	);
}
