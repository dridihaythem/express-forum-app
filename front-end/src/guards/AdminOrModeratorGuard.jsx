import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function AdminOrModeratorGuard({ children }) {
	const { auth, user } = useSelector((state) => state.auth);

	if (!auth || !['admin', 'moderator'].includes(user.role)) return <Navigate to='/auth/login' />;

	return children;
}
