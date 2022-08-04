import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import RowCardLayout from '../components/Layout/RowCardLayout';
import Post from '../components/posts/Post';
import Loading from '../components/UI/Loading';
import UserDetails from '../components/users/UserDetails';
import useHttp from '../hooks/useHttp';

export default function User() {
	const params = useParams();

	const { id } = params;

	const { loading, sendRequest } = useHttp(null, true);

	const [user, setUser] = useState(null);

	const { postsLoading, sendRequest: sendGetPostsRequest } = useHttp(null, true);

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		sendRequest(`/users/${id}`, 'GET', null, (data) => {
			setUser(data.data);
		});
		sendGetPostsRequest(`/posts/findByUser/${id}`, 'GET', null, (data) => {
			setPosts(data.data);
		});
	}, [id]);

	return (
		<>
			<Helmet>
				<title>{!loading && `${user.first_name} ${user.last_name}`}</title>
			</Helmet>
			<RowCardLayout
				title={!loading && `${user.first_name} ${user.last_name} Profile`}
				rowClasses={'justify-content-center'}
				colClasses={'col-md-12 mb-3'}
			>
				{loading ? <Loading /> : <UserDetails user={user} />}
			</RowCardLayout>

			{postsLoading ? (
				<Loading />
			) : (
				<>
					<h3 className='my-3'>Posts : </h3>
					{posts.map((post) => (
						<Post key={post._id} {...post} user={user} />
					))}
				</>
			)}
		</>
	);
}
