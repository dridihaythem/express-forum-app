import React from 'react';

export default function FormGroup({ label, children }) {
	return (
		<div className='form-group mb-2'>
			<label className='mb-1'>{label} : </label>
			{children}
		</div>
	);
}
