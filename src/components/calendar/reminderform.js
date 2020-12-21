import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import ColorPick from "../common/colorpick";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { createReminder } from "../../actions";
import moment from "moment-timezone";

class ReminderForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: new Date(),
			startTime: new Date(),
			hexColor: "#2B2BDC",
			title: "",
			city: "",
		};
	}

	handleChangeColor = (color) => {
		this.setState({ hexColor: color.hex, selectedColor: color });
	};

	handleSubmit = () => {
		const { title, hexColor, city, startDate, startTime } = this.state;

		const date = moment(`${moment(startDate).format("L").toString()} ${moment(startTime).format("HH:mm:ss").toString()}`)
			.tz("America/Bogota")
			.format("YYYY-MM-DD hh:mm:ss");

		this.props.createReminder({ title, color: hexColor, city, date });
	};

	render() {
		const { startDate, startTime, hexColor, title, city } = this.state;

		return (
			<Row className={"w-100"}>
				<Col sm={12} className={"text-center"}>
					<input
						placeholder={"Add Title"}
						className={"reminder-input"}
						value={title}
						onChange={(data) => {
							this.setState({ title: data.target.value });
						}}
					/>
				</Col>
				<Col sm={6} className={"text-left pl-3 p-2"}>
					<DatePicker
						selected={startDate}
						fixedHeight
						className={"reminder-input-date"}
						onChange={(date) => {
							this.setState({ startDate: date });
						}}
					/>
				</Col>
				<Col sm={6} className={"text-left pl-3 p-2"}>
					<DatePicker
						selected={startTime}
						fixedHeight
						className={"reminder-input-date"}
						showTimeSelect
						showTimeSelectOnly
						timeIntervals={5}
						timeCaption='Time'
						dateFormat='h:mm aa'
						onChange={(date) => {
							this.setState({ startTime: date });
						}}
					/>
				</Col>
				<Col sm={6} className={"text-center"}>
					<input
						placeholder={"City"}
						className={"reminder-input"}
						value={city}
						onChange={(data) => {
							this.setState({ city: data.target.value });
						}}
					/>
				</Col>
				<Col sm={5} className={"text-center"}>
					<input
						placeholder={"#Color"}
						className={"reminder-input"}
						value={hexColor}
						onChange={(data) => {
							this.setState({ hexColor: data.target.value });
						}}
					/>
				</Col>
				<Col sm={1} className={"text-center"}>
					<ColorPick handleChange={this.handleChangeColor} color={hexColor} />
				</Col>
				<Col sm={12} className={"mt-4 text-center"}>
					<Button className={"mr-3"} variant='secondary' onClick={this.props.handleCloseModal}>
						{"Close"}
					</Button>
					<Button className={"ml-3"} variant='primary' onClick={this.handleSubmit}>
						{"Add"}
					</Button>
				</Col>
			</Row>
		);
	}
}

const mapStateToProps = ({ reminders }) => {
	const { reminder } = reminders;
	return { reminder };
};

export default connect(mapStateToProps, { createReminder })(ReminderForm);
