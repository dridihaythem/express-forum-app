import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Post from '../../components/posts/Post';
import Loading from '../../components/UI/Loading';
import { getPost } from '../../store/posts';

export default function ShowPost() {
	const { loading, posts } = useSelector((state) => state.posts);

	const dispatch = useDispatch();

	const params = useParams();

	const [post, setPost] = useState(undefined);

	useEffect(() => {
		(async () => {
			if (posts.find((p) => p.slug == params.slug)) {
				setPost(posts.find((p) => p.slug == params.slug));
			} else {
				const data = await dispatch(getPost(params.slug)).unwrap();
				setPost(data);
			}
		})();
	}, []);

	return (
		<>
			<Helmet>
				<title>{post?.title}</title>
			</Helmet>

			{loading && <Loading />}
			{post && <Post showLess={false} {...post} />}
		</>
	);
}
