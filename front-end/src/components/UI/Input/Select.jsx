import React from 'react';

export default function Select({ props, children }) {
	return (
		<select className='form-control' {...props}>
			{children}
		</select>
	);
}
