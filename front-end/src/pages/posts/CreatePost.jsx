import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import RowCardLayout from '../../components/Layout/RowCardLayout';
import FormGroup from '../../components/UI/Input/FormGroup';
import Input from '../../components/UI/Input/Input';
import Textarea from '../../components/UI/Input/Textarea';
import Alert from '../../components/UI/Alert';
import useHttp from '../../hooks/useHttp';
import Loading from '../../components/UI/Loading';
import { ToastContainer, toast } from 'react-toastify';

export default function CreatePost() {
	const navigate = useNavigate();

	const { loading, errors, sendRequest } = useHttp(null, false);

	const [state, setState] = useState({
		title: '',
		content: '',
	});

	const inputChangeHandler = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const submitFormHandler = async (e) => {
		e.preventDefault();
		await sendRequest('/posts', 'POST', { ...state }, () => {
			setState({ title: '', content: '' });
			toast.success('Your post will be published after it has been reviewed', {
				onClose: () => navigate('/'),
			});
		});
	};

	const cardTitle = (
		<>
			<i className='fas fa-plus-circle'></i> Create new post
		</>
	);

	const errorsContent =
		errors.length > 0 && errors.map((error) => <Alert key={error.param} type='danger' message={error.message} />);

	return (
		<>
			<Helmet>
				<title>Create new post</title>
			</Helmet>

			<RowCardLayout title={cardTitle}>
				{errorsContent}

				<ToastContainer autoClose={1500} position='bottom-right' />

				<form onSubmit={submitFormHandler}>
					<FormGroup label='Title'>
						<Input name='title' value={state.title} onChange={inputChangeHandler} disabled={loading} />
					</FormGroup>

					<FormGroup label='Content'>
						<Textarea name='content' value={state.content} onChange={inputChangeHandler} disabled={loading} />
					</FormGroup>

					<button disabled={loading} className='btn btn-primary'>
						Create
					</button>

					{loading && <Loading />}
				</form>
			</RowCardLayout>
		</>
	);
}
