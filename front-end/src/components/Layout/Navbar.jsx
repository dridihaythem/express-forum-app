import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import classes from './Navbar.module.css';

export default React.forwardRef(function (props, ref) {
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
					</ul>
				</div>
			</div>
		</nav>
	);
});
