import React from "react";
import {useState} from "react";
import "./Dropdown.css";

export default function Dropdown({onChange, list, value}) {
	const [isOpen, setIsOpen] = useState(false);

	const handleItemSelect = newValue => {
		onChange(newValue);
		setIsOpen(false);
	};

	return (
		<div className='custom-dropdown'>
			<div className='custom-dropdown-header' onClick={() => setIsOpen(prev => !prev)}>
				<span>{list.find(item => item.value == value).label}</span>
				<i className='fa fa-angle-down' style={{marginTop: "3px"}}></i>
			</div>
			{isOpen && (
				<div className='custom-dropdown-list-wrapper'>
					<ul className='custom-dropdown-list'>
						{list.map(item => (
							<li
								className='custom-dropdown-item'
								onClick={() => handleItemSelect(item.value)}>
								{item.label}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
