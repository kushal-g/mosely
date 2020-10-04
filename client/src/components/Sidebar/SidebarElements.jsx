import React from 'react';
import './SidebarElement.css';

export default function SidebarElements(props) {
	var letter = props.details.name.charAt(0);
	var randomColor = require('randomcolor');
	var color = randomColor();
	return (
		<div className="courseElement">
			<div
				style={{
					backgroundColor: randomColor({
						luminosity: 'dark',
						format: 'rgba',
						alpha: 0.75,
					}),
				}}
				className="courseSymbol"
			>
				{letter}
			</div>
			<div className="courseInfo">
				<div className="name">{props.details.name}</div>
				<div className="section">
					{props.details.section ? props.details.section : null}
				</div>
			</div>
		</div>
	);
}
