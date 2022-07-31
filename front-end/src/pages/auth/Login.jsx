import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RowCardLayout from '../../components/Layout/RowCardLayout';
import Alert from '../../components/UI/Alert';
import FormGroup from '../../components/UI/Input/FormGroup';
import Input from '../../components/UI/Input/Input';
import { login } from '../../store/auth';
import Loading from '../../components/UI/Loading';
import { Helmet } from 'react-helmet';

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.auth);

	const [state, setState] = useState({
		email: '',
		password: '',
	});

	const [errors, setErrors] = useState([]);

	const inputChangeHandler = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const submitFormHandler = async (e) => {
		e.preventDefault();
		try {
			await dispatch(login({ ...state })).unwrap();
			navigate('/');
		} catch (e) {
			setErrors(e);
		}
	};

	const cardTitle = (
		<>
			<i className='fa-solid fa-right-to-bracket'></i> Login to your account
		</>
	);

	const errorsContent =
		errors.length > 0 && errors.map((error) => <Alert key={error.param} type='danger' message={error.message} />);

	return (
		<>
			<Helmet>
				<title>Login to your account</title>
			</Helmet>

			<RowCardLayout title={cardTitle}>
				{errorsContent}

				<form onSubmit={submitFormHandler}>
					<FormGroup label='Email'>
						<Input type='email' name='email' value={state.email} onChange={inputChangeHandler} disabled={loading} />
					</FormGroup>

					<FormGroup label='Password'>
						<Input
							type='password'
							name='password'
							value={state.password}
							onChange={inputChangeHandler}
							disabled={loading}
						/>
					</FormGroup>

					<button disabled={loading} className='btn btn-primary'>
						Login
					</button>

					{loading && <Loading />}
				</form>
			</RowCardLayout>
		</>
	);
}
