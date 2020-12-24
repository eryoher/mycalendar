import React, { Component } from "react";
import { Container } from "react-bootstrap";
import moment from "moment";
import CalendarDay from "./calendarday";
import { connect } from "react-redux";
import { getAllReminders } from "../../actions";
import { formatDate } from "../../constants";
import { faArrowAltCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Mycalendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentMonth: moment(),
			weekdays: moment.weekdays(), //["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"]
		};
	}

	componentDidMount = () => {
		const { currentMonth } = this.state;
		this.props.getAllReminders({ dateSearch: currentMonth.format(formatDate) });
	};

	componentDidUpdate = (prevProps) => {
		const { reminder, removeReminders } = this.props;
		const { currentMonth } = this.state;

		if (prevProps.reminder !== reminder && reminder) {
			this.props.getAllReminders({ dateSearch: currentMonth.format(formatDate) });
		}

		if (prevProps.removeReminders !== removeReminders && removeReminders) {
			this.props.getAllReminders({ dateSearch: currentMonth.format(formatDate) });
		}
	};

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

	filterRemindersByDate = () => {
		const { allReminders } = this.props;
		let reminders = {};

		allReminders.forEach((reminder) => {
			const day = reminder.date.substring(0, 10);

			if (!reminders[day]) {
				reminders[day] = [];
			}

			reminders[day].push(reminder);
		});

		return reminders;
	};

	renderDays = () => {
		const { allReminders } = this.props;
		const remindersByday = allReminders ? this.filterRemindersByDate() : [];
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
			calendarDays.push(
				<CalendarDay reminders={remindersByday} currentMonth={currentMonth.toString()} key={i} day={i} dayWeek={dayWeek} />
			);
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

	handleLastMonth = () => {
		const { currentMonth } = this.state;
		const newdate = currentMonth.subtract(1, "months");
		this.setNewCurrentMonth(newdate);
	};

	handleNextMonth = () => {
		const { currentMonth } = this.state;
		const newdate = currentMonth.add(1, "M");
		this.setNewCurrentMonth(newdate);
	};

	setNewCurrentMonth = (date) => {
		this.setState({ currentMonth: date });
		this.props.getAllReminders({ dateSearch: date.format(formatDate) });
	};

	render() {
		const { currentMonth } = this.state;

		return (
			<Container className={"text-center mt-5"}>
				<div className={"current-day d-flex justify-content-between"}>
					<div className={"change-month d-flex align-items-center"}>
						<FontAwesomeIcon icon={faArrowAltCircleLeft} onClick={this.handleLastMonth} />
					</div>
					<div className={"date-title"}>
						<div className={"year-title mb-0"}> {currentMonth.format("YYYY")} </div>
						<div className={"month-title mb-3"}> {currentMonth.format("MMMM")} </div>
					</div>
					<div className={"change-month d-flex align-items-center"}>
						<FontAwesomeIcon icon={faArrowAltCircleRight} onClick={this.handleNextMonth} />
					</div>
				</div>
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

const mapStateToProps = ({ reminders }) => {
	const { allReminders, reminder, removeReminders } = reminders;
	return { allReminders, reminder, removeReminders };
};

export default connect(mapStateToProps, { getAllReminders })(Mycalendar);
