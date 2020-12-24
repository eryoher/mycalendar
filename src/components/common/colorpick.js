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
			left: "-1px",
			top: "12px",
		};

		return (
			<div>
				<div
					style={{
						textAlign: "right",
						position: "absolute",
						bottom: 0,
						right: 50,
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
