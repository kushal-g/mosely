import React from 'react';
import useLocalStorage from '../../../../Hooks/useLocalStorage';
import { Link } from 'react-router-dom';
import './SidebarElement.css';

var randomColor = require('randomcolor');

export default function SidebarElements(props) {
	var letter = props.details.name.charAt(0);

	const [cardColor, setCardColor] = useLocalStorage(
		props.details.id,
		randomColor({
			luminosity: 'dark',
			format: 'rgba',
			alpha: 0.75,
		})
	);

	return (
		<Link
			style={{ textDecoration: 'none' }}
			to={{
				pathname: `/course/assignment/${props.details.id}`,
				state: { course: props.details },
			}}
		>
			<div className="courseElement">
				<div
					style={{
						backgroundColor: cardColor,
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
		</Link>
	);
}
