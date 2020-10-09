import React from 'react';
import Navbar from '../../../../components/Navbar/Navbar';
import './AssignmentMatchCode.css';

export default function (props) {
	return (
		<div>
			<Navbar />
			<div className="matchFile">
				<div className="file1">
					<h3>Name:{props.location.state.matched.file1.fullName}</h3>
					<h4>Email Id:{props.location.state.matched.file1.email}</h4>
					<div>
						{props.location.state.matched.file1.code.split('\n').map((item, i) => {
							return <p key={i}>{item.split('\t').concat(`    `)}</p>;
						})}
					</div>
				</div>
				<div className="file2">
					<h3>Name:{props.location.state.matched.file2.fullName}</h3>
					<h4>Email Id:{props.location.state.matched.file2.email}</h4>
					<div>
						{props.location.state.matched.file2.code.split('\n').map((item, i) => {
							return <p key={i}>{item}</p>;
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
