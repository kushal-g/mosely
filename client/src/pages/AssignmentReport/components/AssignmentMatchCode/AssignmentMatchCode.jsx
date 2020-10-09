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
					<iframe srcDoc={`<pre>${props.location.state.matched.file1.code}</pre>`} width="100%" height="100%">
					</iframe>
				</div>
				<div className="file2">
					<h3>Name:{props.location.state.matched.file2.fullName}</h3>
					<h4>Email Id:{props.location.state.matched.file2.email}</h4>
					<iframe srcDoc={`<pre>${props.location.state.matched.file2.code}</pre>`} width="100%" height="100%">
					</iframe>
					
				</div>
			</div>
		</div>
	);
}
