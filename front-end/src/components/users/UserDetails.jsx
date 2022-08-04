import React from 'react';
import { getAge, convertDate } from '../../utils/Date';

export default function UserDetails({ user }) {
	return (
		<div>
			<div className='bg-white p-3 d-flex gap-4 shadow-lg align-items-center'>
				<>
					<img width='170px' height='170px' className='rounded-circle' src={user.photo} alt='' />
					<div>
						<h3>
							{user.first_name} {user.last_name}
							<span className='badge text-bg-secondary'>
								{['admin', 'moderator'].includes(user.role) && <i className='fa-solid fa-circle-check'></i>} {user.role}
							</span>
						</h3>
						<div>
							<div className='mb-2'>
								<strong>#ID</strong> : {user.id}
							</div>
							<div className='mb-2'>
								<i className='fa-solid fa-newspaper'></i> -- Posts
							</div>
							<div className='mb-2'>
								<i className='fa-solid fa-comments'></i> -- Comments
							</div>
							<div className='mb-2'>
								<i className='fa-solid fa-calendar'></i> Birthday : {convertDate(user.birthday)} (
								{getAge(user.birthday)} years old)
							</div>
							<div className='mb-2'>
								<i className='fa-solid fa-calendar'></i> Joined : {convertDate(user.createdAt)}
							</div>
						</div>
					</div>
				</>
			</div>
		</div>
	);
}
