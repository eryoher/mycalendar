import React, { Component } from "react";
import { Fragment } from "react";
import { Modal } from "react-bootstrap";
import ReminderForm from "./reminderform";

export default class CalendarDay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
		};
	}

	handleCloseModal = () => {
		this.setState({ showModal: false });
	};

	handleOpenModal = () => {
		this.setState({ showModal: true });
	};

	handleSubmit = () => {};

	render() {
		const { dayWeek, day } = this.props;
		const { showModal } = this.state;
		let classDay = dayWeek % 7 !== 0 ? "calendar-day" : "calendar-day weekend-day";
		classDay = (dayWeek - 1) % 7 !== 0 ? classDay : "calendar-day weekend-day";

		return (
			<Fragment>
				<td onClick={this.handleOpenModal} className={classDay}>
					{day}
				</td>

				<Modal show={showModal} onHide={this.handleCloseModal} aria-labelledby={"ModalHeader"}>
					<Modal.Header closeButton>{"New reminder"}</Modal.Header>
					<Modal.Body>
						<ReminderForm handleSubmit={this.handleSubmit} handleCloseModal={this.handleCloseModal} />
					</Modal.Body>
				</Modal>
			</Fragment>
		);
	}
}
