import React from 'react';

export default function RowCardLayout({
	title,
	children,
	rowClasses = 'justify-content-center',
	colClasses = 'col-md-8',
	cardClasses = 'shadow-lg',
}) {
	return (
		<div className={`row ${rowClasses}`}>
			<div className={`${colClasses}`}>
				<div className={`card ${cardClasses}`}>
					<div className='card-header p-3'>{title}</div>
					<div className='card-body'>{children}</div>
				</div>
			</div>
		</div>
	);
}
