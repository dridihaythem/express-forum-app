import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RowCardLayout from '../../components/Layout/RowCardLayout';
import Alert from '../../components/UI/Alert';
import FormGroup from '../../components/UI/Input/FormGroup';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Input/Select';
import { register } from '../../store/auth';
import Loading from '../../components/UI/Loading';
import { Helmet } from 'react-helmet';

export default function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading, errors } = useSelector((state) => state.auth);

	const [state, setState] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		passwordConfirmation: '',
		gender: 'male',
		birthday: '',
	});

	const inputChangeHandler = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const submitFormHandler = async (e) => {
		e.preventDefault();
		await dispatch(register({ ...state })).unwrap();
		navigate('/');
	};

	const cardTitle = (
		<>
			<i className='fa-solid fa-user-plus'></i> Create new account
		</>
	);

	const errorsContent =
		errors.length > 0 && errors.map((error) => <Alert key={error.param} type='danger' message={error.message} />);

	return (
		<>
			<Helmet>
				<title>Create new account</title>
			</Helmet>

			<RowCardLayout title={cardTitle}>
				{errorsContent}

				<form onSubmit={submitFormHandler}>
					<FormGroup label='First Name'>
						<Input name='first_name' value={state.first_name} onChange={inputChangeHandler} disabled={loading} />
					</FormGroup>

					<FormGroup label='Last Name'>
						<Input name='last_name' value={state.last_name} onChange={inputChangeHandler} disabled={loading} />
					</FormGroup>

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

					<FormGroup label='Password Confirmation'>
						<Input
							type='password'
							name='passwordConfirmation'
							value={state.passwordConfirmation}
							onChange={inputChangeHandler}
							disabled={loading}
						/>
					</FormGroup>

					<FormGroup label='Birthday'>
						<Input
							type='date'
							name='birthday'
							value={state.birthday}
							onChange={inputChangeHandler}
							disabled={loading}
						/>
					</FormGroup>

					<FormGroup label='Gender'>
						<Select name='gender' value={state.birthday} onChange={inputChangeHandler} disabled={loading}>
							<option value='male'>male</option>
							<option value='female'>female</option>
						</Select>
					</FormGroup>

					<button disabled={loading} className='btn btn-primary'>
						Register
					</button>

					{loading && <Loading />}
				</form>
			</RowCardLayout>
		</>
	);
}
