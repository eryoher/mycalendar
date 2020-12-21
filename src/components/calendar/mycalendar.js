import React, { Component } from "react";
import { Container } from "react-bootstrap";
import moment from "moment";
import CalendarDay from "./calendarday";

export default class Mycalendar extends Component {
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
			results.push(
				<th className={"week-header"} key={day}>
					{day}
				</th>
			);
		});

		return results;
	};

	renderDays = () => {
		const { currentMonth } = this.state;
		const rows = [],
			calendarDays = [];

		const daysInMonth = currentMonth.daysInMonth();
		const firstDay = currentMonth.startOf("month").format("d");

		let cells = [];

		for (let i = 0; i < firstDay; i++) {
			const classDay = i === 0 ? "weekend-day" : "";
			calendarDays.push(
				<td className={classDay} key={i + 31}>
					{""}
				</td>
			);
		}

		for (let i = 1; i <= daysInMonth; i++) {
			const dayWeek = parseInt(i) + parseInt(firstDay);
			calendarDays.push(<CalendarDay key={i} day={i} dayWeek={dayWeek} />);
		}

		calendarDays.forEach((row, i) => {
			if (i % 7 !== 0) {
				cells.push(row);
			} else {
				let insertRow = cells.slice();
				rows.push(insertRow);
				cells = [];
				cells.push(row);
			}
			if (i === calendarDays.length - 1) {
				let insertRow = cells.slice();
				rows.push(insertRow);
			}
		});

		return rows.map((d, i) => {
			return <tr key={i}>{d}</tr>;
		});
	};

	render() {
		return (
			<Container className={"text-center mt-5"}>
				<table className={"table table-bordered"}>
					<thead className={"table-header"}>
						<tr>{this.renderWeeks()}</tr>
					</thead>
					<tbody>{this.renderDays()}</tbody>
				</table>
			</Container>
		);
	}
}
