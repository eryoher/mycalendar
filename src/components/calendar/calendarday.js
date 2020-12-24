import React, { Component } from "react";
import { Fragment } from "react";
import ReminderForm from "./reminderform";
import moment from "moment";
import { connect } from "react-redux";
import { getRemindersByDay, removeRemindersByDay } from "../../actions";
import { formatDate } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import CommonModal from "../common/commonModal";

class CalendarDay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			showRemoveModal: false,
			editReminder: null,
		};
	}

	componentDidUpdate = (prevProps) => {
		const { removeReminders } = this.props;
		if (prevProps.removeReminders !== removeReminders && removeReminders && removeReminders.count) {
			this.setState({ showRemoveModal: false });
		}
	};
	handleCloseModal = () => {
		this.setState({ showModal: false });
	};

	handleOpenModal = () => {
		this.setState({ showModal: true, editReminder: null });
	};

	handleRemoveReminders = () => {
		const { currentMonth, day } = this.props;
		const removeDate = moment(currentMonth).set("date", day);
		this.props.removeRemindersByDay({ removeDate });
	};

	renderday = (day, reminders) => {
		const { currentMonth } = this.props;
		const newDate = moment(currentMonth).set("date", day);
		const today = moment();
		const classDay = newDate.format(formatDate) === today.format(formatDate) ? "today" : "";

		const results = [];
		results.push(
			<div className={"current-day d-flex justify-content-between"} key={0}>
				<span className={classDay}>{day}</span>
				<span className={"reminder-add-icon"}>
					{reminders && <FontAwesomeIcon className={"mr-1"} onClick={this.toggleRemoveModal} icon={faTimesCircle} />}
					{<FontAwesomeIcon onClick={this.handleOpenModal} icon={faPlusCircle} />}
				</span>
			</div>
		);

		if (reminders) {
			reminders.sort((a, b) => {
				return new Date(a.date) - new Date(b.date);
			});

			reminders.forEach((remind) => {
				const { title } = remind;
				results.push(
					<div
						key={remind.id}
						onClick={() => this.selectReminder(remind)}
						className={"reminder-view"}
						style={{ backgroundColor: remind.color }}
					>
						{title.length >= 15 ? `${title.substring(0, 12)}...` : title}
					</div>
				);
			});
		}

		return results;
	};

	selectReminder = (reminder) => {
		this.setState({ editReminder: reminder, showModal: true });
	};

	toggleRemoveModal = () => {
		this.setState((state) => ({ showRemoveModal: !state.showRemoveModal }));
	};

	render() {
		const { dayWeek, day, currentMonth, reminders } = this.props;
		const { showModal, editReminder, showRemoveModal } = this.state;

		const newDate = moment(currentMonth).set("date", day);
		const remindersByday = reminders[newDate.format(formatDate)];
		let classDay = dayWeek % 7 !== 0 ? "calendar-day" : "calendar-day weekend-day";
		classDay = (dayWeek - 1) % 7 !== 0 ? classDay : "calendar-day weekend-day";

		return (
			<Fragment>
				<td className={classDay}>{this.renderday(day, remindersByday)}</td>
				<CommonModal
					showModal={showRemoveModal}
					handleCloseModal={this.toggleRemoveModal}
					handleSubmit={this.handleRemoveReminders}
					buttons
					modalTitle={"Delete reminder"}
					modalBody={"Are you sure you want to remove the reminders of the day"}
					closeButton={"Close"}
					submitButton={"Delete"}
				/>

				<CommonModal
					showModal={showModal}
					handleCloseModal={this.handleCloseModal}
					modalTitle={"New reminder"}
					modalBody={
						<ReminderForm
							editReminder={editReminder}
							defaultDate={newDate.toString()}
							handleSubmit={this.handleSubmit}
							handleCloseModal={this.handleCloseModal}
						/>
					}
				/>
			</Fragment>
		);
	}
}

const mapStateToProps = ({ reminders }) => {
	const { reminder, removeReminders } = reminders;
	return { reminder, removeReminders };
};

export default connect(mapStateToProps, { getRemindersByDay, removeRemindersByDay })(CalendarDay);
