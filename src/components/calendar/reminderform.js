import React, { Component } from "react";
import { Col, Row, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import ColorPick from "../common/colorpick";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { createReminder, getAllReminders, getWeatherByCity, clearWeatherState } from "../../actions";
import moment from "moment-timezone";
import { formatDate } from "../../constants";
import { Formik } from "formik";
import * as Yup from "yup";

class ReminderForm extends Component {
	constructor(props) {
		super(props);
		const { editReminder, defaultDate } = props;
		const city = editReminder ? editReminder.city : "";
		this.state = {
			startDate: editReminder ? new Date(editReminder.date) : defaultDate ? new Date(defaultDate) : new Date(),
			startTime: editReminder ? new Date(editReminder.date) : new Date(),
			hexColor: editReminder ? editReminder.color : "#2B2BDC",
			title: editReminder ? editReminder.title : "",
			city,
		};
	}

	handleChangeColor = (color) => {
		this.setState({ hexColor: color.hex, selectedColor: color });
	};

	componentDidMount = () => {
		const { editReminder } = this.props;
		const city = editReminder ? editReminder.city : "";
		if (city) {
			this.props.getWeatherByCity({ city });
		}
	};

	componentDidUpdate = (prevProps) => {
		const { reminder } = this.props;
		if (prevProps.reminder !== reminder && reminder) {
			this.props.handleCloseModal(); //Close modal
		}
	};

	componentWillUnmount = () => {
		this.props.clearWeatherState();
	};

	handleSubmitForm = (values) => {
		const { title, hexColor, city, startDate, startTime } = values;
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
		const { hexColor } = this.state;
		const { weatherByDay, weatherError } = this.props;

		return (
			<Formik
				ref={this.formRef}
				initialValues={this.state}
				onSubmit={(values, actions) => {
					this.handleSubmitForm(values);
				}}
				validationSchema={Yup.object().shape({
					title: Yup.string().required("The title is required"),
					city: Yup.string().required("The title is required"),
					startDate: Yup.string().required("The date is required"),
					startTime: Yup.string().required("The hour is required"),
					hexColor: Yup.string().required("The color is required"),
				})}
				enableReinitialize={false}
				render={({
					values,
					handleBlur,
					handleChange,
					errors,
					touched,
					isSubmitting,
					handleSubmit,
					setFieldValue,
					setFieldTouched,
				}) => (
					<Form onSubmit={handleSubmit} className='voucher-info-form'>
						<Row className={"w-100"}>
							<Col sm={12} className={"text-center"}>
								<input
									placeholder={"Add Title"}
									name={"title"}
									className={`reminder-input ${touched.title && errors.title ? "require-error" : ""}`}
									maxLength={30}
									value={values.title}
									onBlur={handleBlur}
									onChange={(data) => {
										//this.setState({ title: data.target.value });
										setFieldValue("title", data.target.value);
									}}
								/>
							</Col>
							<Col sm={6} className={"text-left pl-3 p-2"}>
								<DatePicker
									selected={values.startDate}
									name={"startDate"}
									value={values.startDate}
									onBlur={handleBlur}
									fixedHeight
									className={`reminder-input-date ${touched.startDate && errors.startDate ? "require-error" : ""}`}
									onChange={(date) => {
										this.setState({ startDate: date });
										setFieldValue("startDate", date);
									}}
								/>
							</Col>
							<Col sm={6} className={"text-left pl-3 p-2"}>
								<DatePicker
									selected={values.startTime}
									fixedHeight
									className={`reminder-input-date ${touched.startTime && errors.startTime ? "require-error" : ""}`}
									showTimeSelect
									showTimeSelectOnly
									timeIntervals={5}
									timeCaption='Time'
									dateFormat='h:mm aa'
									name={"startTime"}
									value={values.startTime}
									onBlur={handleBlur}
									onChange={(date) => {
										this.setState({ startTime: date });
										setFieldValue("startTime", date);
									}}
								/>
							</Col>
							<Col sm={6} className={"text-center"}>
								<input
									placeholder={"City"}
									className={`reminder-input ${touched.city && errors.city ? "require-error" : ""}`}
									value={values.city}
									onKeyDown={(evt) => {
										if (evt.keyCode === 13) {
											this.props.getWeatherByCity({ city: evt.target.value });
										}
									}}
									onBlur={(evt) => {
										handleBlur(evt);
										this.props.getWeatherByCity({ city: evt.target.value });
									}}
									onChange={(data) => {
										this.setState({ city: data.target.value });
										setFieldValue("city", data.target.value);
									}}
								/>
							</Col>
							<Col sm={5} className={"text-center"}>
								<input
									placeholder={"#Color"}
									name={"hexColor"}
									className={`reminder-input ${touched.hexColor && errors.hexColor ? "require-error" : ""}`}
									value={values.hexColor}
									onBlur={handleBlur}
									onChange={(data) => {
										this.setState({ hexColor: data.target.value });
										setFieldValue("hexColor", data.target.value);
									}}
								/>
							</Col>
							<Col sm={1} className={"text-center"}>
								<ColorPick
									handleChange={(color) => {
										setFieldValue("hexColor", color.hex);
										this.handleChangeColor(color);
									}}
									color={hexColor}
								/>
							</Col>
							<Col>
								{weatherByDay && (
									<div className={"mt-3"}>
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

								{weatherError && <div className={"mt-3 weather-error"}>{weatherError}</div>}
							</Col>
							<Col sm={12} className={"mt-4 text-center"}>
								<Button className={"mr-3"} variant='secondary' onClick={this.props.handleCloseModal}>
									{"Close"}
								</Button>
								<Button className={"ml-3"} variant='primary' type={"submit"}>
									{"Add"}
								</Button>
							</Col>
						</Row>
					</Form>
				)}
			/>
		);
	}
}

const mapStateToProps = ({ reminders, weathers }) => {
	const { reminder } = reminders;
	const { weatherByDay, weatherError } = weathers;
	return { reminder, weatherByDay, weatherError };
};

export default connect(mapStateToProps, { createReminder, getAllReminders, getWeatherByCity, clearWeatherState })(
	ReminderForm
);
