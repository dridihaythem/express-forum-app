import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { convertDate, convertTime } from '../../utils/Date';
import PostAction from './PostAction';

export default function Post({ showLess = true, slug, title, content, publishedAt, user }) {
	const { auth, user: authUser } = useSelector((state) => state.auth);

	return (
		<div className='card shadow mb-3'>
			<div className='card-header'>{title}</div>
			<div className='card-body'>
				{showLess ? content.substr(1, 150) + '...' : content}

				{showLess && <Link to={`/posts/${slug}`}>Read more</Link>}
			</div>
			<div className='card-footer shadow'>
				<Link to={`/users/${user.id}`}>
					<span className='me-2' oa>
						<img width='25px' className='rounded-circle me-1' src={user.photo} />
						{user.first_name} {user.last_name}
					</span>
				</Link>
				<span>
					<i className='fa-solid fa-clock'></i>
					{convertDate(publishedAt, { year: 'numeric', month: 'long', day: 'numeric' })} {convertTime(publishedAt)}
				</span>
			</div>

			{auth && ['admin', 'moderator'].includes(authUser.role) && <PostAction slug={slug} />}
		</div>
	);
}
