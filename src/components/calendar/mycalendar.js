import React, { Component } from "react";
import { Container } from "react-bootstrap";
import moment from "moment";

export default class mycalendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentMonth: moment(),
			weekdays: moment.weekdays(), //["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"]
		};
	}

	renderWeeks = () => {
		const { weekdays } = this.state;
		const results = [];

		weekdays.forEach((day) => {
			results.push(<th key={day}>{day}</th>);
		});

		return results;
	};

	renderDays = () => {
		const { currentMonth } = this.state;
		const results = [],
			rows = [],
			blanks = [];

		const daysInMonth = currentMonth.daysInMonth();
		const firstDay = currentMonth.startOf("month").format("d");

		let cells = [];

		for (let i = 0; i < firstDay; i++) {
			blanks.push(<td key={i + 31}>{""}</td>);
		}

		for (let i = 1; i <= daysInMonth; i++) {
			const day = (
				<td key={i} className={"calendar-day"}>
					<span>{i}</span>
				</td>
			);

			results.push(day);
		}

		var totalSlots = [...blanks, ...results];

		totalSlots.forEach((row, i) => {
			if (i % 7 !== 0) {
				cells.push(row);
			} else {
				let insertRow = cells.slice();
				rows.push(insertRow);
				cells = [];
				cells.push(row);
			}
			if (i === totalSlots.length - 1) {
				let insertRow = cells.slice();
				rows.push(insertRow);
			}
		});

		const trElems = rows.map((d, i) => {
			return <tr key={i * 100}>{d}</tr>;
		});

		return trElems;
	};

	render() {
		return (
			<Container className={"text-center"}>
				<table className={"table table-bordered"}>
					<thead>
						<tr className='calendar-header'>{this.renderWeeks()}</tr>
					</thead>
					<tbody>{this.renderDays()}</tbody>
				</table>
			</Container>
		);
	}
}
