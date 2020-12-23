import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import ColorPick from "../common/colorpick";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { createReminder, getAllReminders, getWeatherByCity } from "../../actions";
import moment from "moment-timezone";
import { formatDate } from "../../constants";

class ReminderForm extends Component {
	constructor(props) {
		super(props);
		const { editReminder, defaultDate } = props;

		this.state = {
			startDate: editReminder ? new Date(editReminder.date) : defaultDate ? new Date(defaultDate) : new Date(),
			startTime: editReminder ? new Date(editReminder.date) : new Date(),
			hexColor: editReminder ? editReminder.color : "#2B2BDC",
			title: editReminder ? editReminder.title : "",
			city: editReminder ? editReminder.city : "",
		};
	}

	handleChangeColor = (color) => {
		this.setState({ hexColor: color.hex, selectedColor: color });
	};

	componentDidUpdate = (prevProps) => {
		const { reminder } = this.props;
		if (prevProps.reminder !== reminder && reminder) {
			this.props.handleCloseModal(); //Close modal
		}
	};

	handleSubmit = () => {
		const { title, hexColor, city, startDate, startTime } = this.state;
		const { editReminder } = this.props;

		const date = moment(
			`${moment(startDate).format("L").toString()} ${moment(startTime).format("HH:mm:ss").toString()}`
		).tz("America/Bogota");

		const params = {
			title,
			color: hexColor,
			city,
			realDate: date.format(formatDate),
			date: date.format(`${formatDate} HH:mm:ss`),
			active: true,
		};

		if (editReminder) {
			params["id"] = editReminder.id;
		}

		this.props.createReminder(params);
	};

	render() {
		const { startDate, startTime, hexColor, title, city } = this.state;
		const { weatherByDay } = this.props;
		return (
			<Row className={"w-100"}>
				<Col sm={12} className={"text-center"}>
					<input
						placeholder={"Add Title"}
						className={"reminder-input"}
						maxLength={30}
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
						onBlur={(evt) => {
							console.log(evt.target.value);
							this.props.getWeatherByCity({ city: evt.target.value });
						}}
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
				<Col>
					{weatherByDay && (
						<div>
							<div className='location-box'>
								<div className='location'>
									{weatherByDay.name}, {weatherByDay.sys.country}
								</div>
							</div>
							<div className='weather-box'>
								<div className='temp'>{Math.round(weatherByDay.main.temp)}°c</div>
								<div className='weather'>{weatherByDay.weather[0].main}</div>
							</div>
						</div>
					)}
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

const mapStateToProps = ({ reminders, weathers }) => {
	const { reminder } = reminders;
	const { weatherByDay } = weathers;
	return { reminder, weatherByDay };
};

export default connect(mapStateToProps, { createReminder, getAllReminders, getWeatherByCity })(ReminderForm);
