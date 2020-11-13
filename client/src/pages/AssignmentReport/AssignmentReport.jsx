import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import { v4 } from 'uuid';
import { FileCodeIcon } from 'react-line-awesome';
import Navbar from '../../components/Navbar/Navbar';
import Graph from 'react-graph-vis';
import './AssignmentReport.css';
import randomColor from 'randomcolor';
import Loader from '../../components/Loader/Loader';

export default function AssignmentReport(props) {
	let { id } = useParams();
	const { currentUser, loading } = useContext(AuthContext);
	const [report, setReport] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const options = {
		edges: {
			arrows: { to: { enabled: false } },
			color: { inherit: 'from', opacity: 0.5 },
		},
		height: '700px',
	};
	async function getReport() {
		const token = await currentUser.getIdToken();
		const result = await fetch(`${process.env.REACT_APP_URL}/moss/report/?courseWorkId=${id}`, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-type': 'application/json',
			},
		});

		const body = await result.json();
		setReport(body.data.report.report);
		setIsLoading(false);
		//console.log(body.data);
	}
	function getNodes(report) {
		var dict = {};
		var nodes = [];
		report.map(matches => {
			if (dict[matches.file1.email] == undefined) {
				dict[matches.file1.email] = {
					fullName: matches.file1.fullName,
					edgeCount: 1,
				};
			} else {
				dict[matches.file1.email].edgeCount++;
			}
			if (dict[matches.file2.email] == undefined) {
				dict[matches.file2.email] = {
					fullName: matches.file2.fullName,
					edgeCount: 1,
				};
			} else {
				dict[matches.file2.email].edgeCount++;
			}
		});
		for (id in dict) {
			nodes.push({
				id: id,
				label: dict[id].fullName,
				title: id,
				shape: 'dot',
				value: dict[id].edgeCount,
				color: randomColor({
					luminosity: 'light',
					format: 'rgba',
					alpha: 0.75,
				}),
				font: { size: 12 },
			});
		}
		return nodes;
	}
	function getEdges(report) {
		return report.map(matches => {
			var percent = (matches.file1.percentage + matches.file2.percentage) / 2;
			return {
				from: matches.file1.email,
				to: matches.file2.email,
				width: percent / 10,
				label: `${Math.floor(percent)}`,
				font: { align: 'top' },
			};
		});
	}

	useEffect(() => {
		getReport();
	}, [currentUser]);
	return (
		<div>
			<Navbar />
			{isLoading && <Loader />}
			{report ? (
				<div>
					<Graph
						graph={{
							nodes: getNodes(report),
							edges: getEdges(report),
						}}
						options={options}
						key={v4()}
					/>
					<div>
						<table className='matchTable'>
							<thead>
								<th>Sr No.</th>
								<th>Student 1</th>
								<th>Student 2</th>
								<th className='percent'>Match Percentage</th>
								{props.location.state.teacher ? <th>View Files</th> : ''}
							</thead>
							<tbody>
								{report.map((matches, index) => {
									return (
										<tr>
											<td>{index + 1}</td>
											<td title={matches.file1.email}>
												{matches.file1.fullName}
											</td>
											<td title={matches.file2.email}>
												{matches.file2.fullName}
											</td>
											<td>
												{(matches.file1.percentage +
													matches.file2.percentage) /
													2}
											</td>
											{props.location.state.teacher ? (
												<td>
													<Link
														to={{
															pathname: '/course/assignments/matched',
															state: {
																matched: matches,
															},
														}}
													>
														<FileCodeIcon />
													</Link>
												</td>
											) : (
												''
											)}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			) : (
				<div className='rejectReport'>
					<h3>No Reports are available at the moment</h3>
					<br></br>
					<p>It could be due to the following reasons:</p>
					<p className='reasons' style={{ textAlign: 'left' }}>
						1.Teacher has not registered on this site<br></br>
						2.Teacher might not have put a valid Moss ID<br></br>
						3.No or only 1 submission has been made<br></br>
						4.Assignment description does not contain Language Specification
					</p>
				</div>
			)}
		</div>
	);
}
