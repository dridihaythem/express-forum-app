import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../../components/posts/Post';
import Alert from '../../components/UI/Alert';
import Loading from '../../components/UI/Loading';
import { getUnpublishedPosts } from '../../store/posts';

export default function Unpublished() {
	const dispatch = useDispatch();

	const { loading, posts } = useSelector((state) => state.posts);

	useEffect(() => {
		dispatch(getUnpublishedPosts());
	}, []);

	if (loading) {
		return <Loading />;
	}

	if (posts.length == 0) {
		return <Alert type='danger' message='No posts found yet !' />;
	}
	return (
		<>
			{posts.map((post) => (
				<Post key={post.id} showLess={false} {...post} />
			))}
		</>
	);
}
