import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, postsActions } from '../store/posts';
import Post from '../components/posts/Post';
import Loading from '../components/UI/Loading';

export default function Home() {
	const auth = useSelector((state) => state.auth.auth);
	const { loading, posts } = useSelector((state) => state.posts);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, []);

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

				{loading ? <Loading /> : posts.map((post) => <Post key={posts._id} {...post} />)}
			</div>
		</>
	);
}
