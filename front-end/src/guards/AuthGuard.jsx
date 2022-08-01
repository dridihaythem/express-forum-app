import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function AuthGuard({ children }) {
	const auth = useSelector((state) => state.auth.auth);

	if (!auth) return <Navigate to='/auth/login' />;

	return children;
}
