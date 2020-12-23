import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

export default class CommonModal extends Component {
	render() {
		const {
			showModal,
			modalTitle,
			modalBody,
			handleCloseModal,
			closeButton,
			buttons,
			submitButton,
			handleSubmit,
		} = this.props;

		return (
			<Modal show={showModal} onHide={handleCloseModal} aria-labelledby={"ModalHeader"}>
				{modalTitle && <Modal.Header closeButton>{modalTitle}</Modal.Header>}
				<Modal.Body>{modalBody}</Modal.Body>
				{buttons && (
					<Modal.Footer>
						<Button variant='secondary' onClick={handleCloseModal}>
							{closeButton}
						</Button>
						<Button variant='primary' onClick={handleSubmit}>
							{submitButton}
						</Button>
					</Modal.Footer>
				)}
			</Modal>
		);
	}
}
