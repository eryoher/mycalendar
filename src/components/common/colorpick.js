import React, { Component } from "react";
import { SketchPicker } from "react-color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

export default class ColorPick extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayColorPicker: false,
			color: {
				r: "241",
				g: "112",
				b: "19",
				a: "1",
			},
		};
	}

	handleClick = () => {
		this.setState({ displayColorPicker: !this.state.displayColorPicker });
	};

	render() {
		const popover = {
			position: "absolute",
			zIndex: "2",
			left: "-25px",
		};
		const cover = {
			position: "fixed",
			top: "0px",
			right: "0px",
			bottom: "0px",
			left: "0px",
		};
		return (
			<div>
				<div
					style={{
						textAlign: "right",
						position: "absolute",
						bottom: 15,
						right: 20,
						cursor: "pointer",
						color: this.props.color,
					}}
				>
					<FontAwesomeIcon className='fa-lg' icon={faPalette} onClick={this.handleClick} />
				</div>
				{this.state.displayColorPicker ? (
					<div style={popover}>
						<SketchPicker color={this.props.color} onChange={this.props.handleChange} />
					</div>
				) : null}
			</div>
		);
	}
}
