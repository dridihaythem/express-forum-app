import React from 'react';

export default function Alert({ showIcon = true, type, message }) {
	const classes = `alert alert-${type}`;
	let icon = null;
	if (showIcon) {
		if (type === 'danger') {
			icon = <i className='fas fa-times-circle'></i>;
		} else if (type == 'info') {
			icon = <i className='fas fa-info-circle'></i>;
		}
	}
	return (
		<div className={classes}>
			{icon} {message}
		</div>
	);
}
