import React from 'react';

export default function Input(props) {
	const type = props.type || 'text';
	return <input className='form-control' type={type} {...props} />;
}
