import React from 'react';
import { useDispatch } from 'react-redux';
import { takeAction } from '../../store/posts';

export default function PostAction({ slug }) {
	const dispatch = useDispatch();

	const actionHandler = (action, ban = false) => {
		dispatch(takeAction({ slug, action, ban }));
	};

	return (
		<div className='mt-2 p-2'>
			<button className='btn btn-success' onClick={() => actionHandler('publish')}>
				Approve
			</button>
			<button className='btn btn-delete' onClick={() => actionHandler('delete')}>
				Delete
			</button>
			<button className='btn btn-danger' onClick={() => actionHandler('delete', true)}>
				Delete And Ban User
			</button>
		</div>
	);
}
