import React, { Component } from "react";
import { Fragment } from "react";
import { Modal } from "react-bootstrap";
import ReminderForm from "./reminderform";
import moment from "moment";
import { connect } from "react-redux";
import { getRemindersByDay } from "../../actions";
import { formatDate } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

class CalendarDay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
		};
	}

	componentDidMount = () => {
		const { day, currentMonth } = this.props;
		const newDate = moment(currentMonth).set("date", day);
		//this.props.getRemindersByDay({ daydate: newDate.format(formatDate) });
	};

	handleCloseModal = () => {
		this.setState({ showModal: false });
	};

	handleOpenModal = () => {
		this.setState({ showModal: true });
	};

	renderday = (day, reminders) => {
		const results = [];
		results.push(
			<div className={"current-day d-flex justify-content-between"} key={0}>
				<span>{day}</span>
				<span className={"reminder-add-icon"}>
					{<FontAwesomeIcon onClick={this.handleOpenModal} icon={faPlusCircle} />}
				</span>
			</div>
		);

		if (reminders) {
			reminders.forEach((remind) => {
				results.push(
					<div key={remind.id} className={"reminder-view"} style={{ backgroundColor: remind.color }}>
						{remind.title}
					</div>
				);
			});
		}

		return results;
	};

	render() {
		const { dayWeek, day, currentMonth, reminders } = this.props;
		const { showModal } = this.state;

		const newDate = moment(currentMonth).set("date", day);
		const remindersByday = reminders[newDate.format(formatDate)];
		let classDay = dayWeek % 7 !== 0 ? "calendar-day" : "calendar-day weekend-day";
		classDay = (dayWeek - 1) % 7 !== 0 ? classDay : "calendar-day weekend-day";

		return (
			<Fragment>
				<td className={classDay}>{this.renderday(day, remindersByday)}</td>

				<Modal show={showModal} onHide={this.handleCloseModal} aria-labelledby={"ModalHeader"}>
					<Modal.Header closeButton>{"New reminder"}</Modal.Header>
					<Modal.Body>
						<ReminderForm
							defaultDate={newDate.toString()}
							handleSubmit={this.handleSubmit}
							handleCloseModal={this.handleCloseModal}
						/>
					</Modal.Body>
				</Modal>
			</Fragment>
		);
	}
}

const mapStateToProps = ({ reminders }) => {
	const { reminder } = reminders;
	return { reminder };
};

export default connect(mapStateToProps, { getRemindersByDay })(CalendarDay);
