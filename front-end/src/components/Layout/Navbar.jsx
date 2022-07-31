import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { authActions } from '../../store/auth';
import classes from './Navbar.module.css';

export default React.forwardRef(function (props, ref) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { auth, user } = useSelector((state) => state.auth);

	const logoutHandler = () => {
		dispatch(authActions.logout());
		navigate('/auth/login');
	};
	return (
		<nav className={`navbar navbar-expand-lg bg-dark  navbar-dark mb-2 ${classes.navbar}`}>
			<div className='container'>
				<Link className='navbar-brand' to='/'>
					<img src={Logo} className={classes.logo} alt='MERN FORUM' />
					MERN FORUM
				</Link>
				<button
					className={`navbar-toggler ${classes.toggler}`}
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<i className='fa-solid fa-bars text-white'></i>
				</button>
				<div ref={ref} className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<li className={`nav-link ${classes.link}`}>
							<Link className='nav-link' to='/'>
								<i className='fa-solid fa-house-user'></i> Home
							</Link>
						</li>
					</ul>
					<ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
						{!auth && (
							<>
								<li className={`nav-link ${classes.link}`}>
									<Link className='nav-link' to='/auth/login'>
										<i className='fa-solid fa-arrow-right-to-bracket'></i> Login
									</Link>
								</li>
								<li className={`nav-link ${classes.link}`}>
									<Link className='nav-link' to='/auth/register'>
										<i className='fa-solid fa-user-plus'></i> Create new Account
									</Link>
								</li>
							</>
						)}
						{auth && (
							<>
								<li className={`nav-link dropdown`}>
									<a
										className='nav-link dropdown-toggle'
										href='#'
										role='button'
										data-bs-toggle='dropdown'
										aria-expanded='false'
									>
										<img className={`rounded-circle ${classes['user-avatar']}`} src={user.photo} />
										{user.first_name} {user.last_name}
									</a>
									<ul className='dropdown-menu'>
										<li>
											<Link to='/profile' className='dropdown-item'>
												<i className='fa-solid fa-pen'></i> Edit my profile
											</Link>
										</li>
										<li>
											<hr className='dropdown-divider' />
										</li>
										<li>
											<a onClick={logoutHandler} className='dropdown-item cursor-pointer'>
												<i className='fas fa-sign-out'></i> Logout
											</a>
										</li>
									</ul>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
});
