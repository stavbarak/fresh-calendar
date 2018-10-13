import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import TaskForm from './TaskForm';

class TaskModal extends Component {

  render(){
    const { closeModal, showModal, taskId } = this.props;
    return (
        <Modal
          className="modal-container"
          show={showModal}
          onHide={closeModal}
        >
            <Modal.Body>
              <TaskForm taskId={taskId} {...this.props} />
            </Modal.Body>  

        </Modal>
    );
  }

}

export default TaskModal;

