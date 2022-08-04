import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RowCardLayout from '../components/Layout/RowCardLayout';
import Loading from '../components/UI/Loading';
import UserDetails from '../components/users/UserDetails';
import useHttp from '../hooks/useHttp';

export default function User() {
	const params = useParams();

	const { id } = params;

	const { loading, state, sendRequest } = useHttp(null, true);

	useEffect(() => {
		sendRequest(`/users/${id}`, 'GET');
	}, [id]);

	return (
		<>
			<RowCardLayout
				title={`${state?.data?.first_name} ${state?.data?.last_name} Profile`}
				rowClasses={'justify-content-center'}
				colClasses={'col-md-10 mb-3'}
			>
				{loading ? <Loading /> : <UserDetails user={state.data} />}
			</RowCardLayout>
		</>
	);
}
