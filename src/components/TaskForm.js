import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import { Link } from 'react-router-dom';
import { createTask, updateTask, setDefaults} from '../actions/TasksActions';
import { closeModal } from '../actions/GeneralActions';


class TaskForm extends Component {

    componentWillMount(){
        const { taskId } = this.props;
        const rightNow = new Date();
        const startTime = rightNow.setHours(rightNow.getHours());
        const endTime = rightNow.setHours(rightNow.getHours()+1);
        if(!taskId) this.fillFormWithDefaults(startTime, endTime);
    }

    fillFormWithDefaults = (startTime, endTime) => {
        const { selectedDate, setDefaults } = this.props;  
        const timeFormat = "HH:mm";
        const dateFormat = "YYYY-MM-DD";
            
        const startTimeFormatted = dateFns.format(startTime, timeFormat);
        const endTimeFormatted = dateFns.format(endTime, timeFormat);
        const dateFormatted = dateFns.format(selectedDate, dateFormat);

        const defaultTaskDetails = { 
            date: dateFormatted, 
            startTime: startTimeFormatted,
            endTime: endTimeFormatted,
            eventText: "A thing!"
        }

        setDefaults(defaultTaskDetails); 
    }

    saveTask = (values, dispatch) => {
        dispatch(createTask({task: values}));
        dispatch(reset('taskForm'));
        dispatch(closeModal());
    }

    updateTask = (id, values, dispatch) => {
        const newTaskDetails = { ...values } 
        dispatch(updateTask(id, newTaskDetails));
        //this.props.history.push('/');
        this.props.getBack();
    }

    onSubmit = (values, dispatch) => {        
        if(this.props.taskId) {
            this.updateTask(this.props.taskId, values, dispatch)
        } else {
            this.saveTask(values, dispatch);
        }
    }

    renderField(field) {
        const { type, placeholder, meta: { touched, error } } = field;
        const className = `formInput form-group ${touched && error ? "has-danger" : ""}`;

        return (
          <div className={className}>
            <FormControl className="formInput" {...field.input} type={type} placeholder={placeholder} />
            <div className="text-help">
              {touched ? error : ""}
            </div>
          </div>
        );
      }


    validateRequiredFields(value) {
        return value ? undefined : 'Required'
    }

    render(){
        const { handleSubmit, closeModal, windowWidth } = this.props;
        const isMobile = windowWidth < 668;  

        return (
                <form onSubmit={ handleSubmit(this.onSubmit) } className="taskForm">
                    <span className="formLabel">What do you want to do?</span>
                    <Field
                        type="text"
                        name="eventText"
                        component={this.renderField}        
                        validate={this.validateRequiredFields}                     
                    />
                    <span className="formLabel">When?</span>
                    <Field
                        type="date"
                        name="date"
                        component={this.renderField}        
                        validate={this.validateRequiredFields}                     
                    />
                    <div className="inputBox">
                      <span className="timeLabel">From</span>
                      <Field
                        type="time"
                        name="startTime"
                        component={this.renderField}        
                        validate={this.validateRequiredFields}                     
                    />
                        <span className="timeLabel">To</span>
                        <Field
                        type="time"
                        name="endTime"
                        component={this.renderField}        
                        validate={this.validateRequiredFields}                     
                    />
                    </div>

                    <div className="newTaskFooter">
                        <Button type="submit" className="btn btn-primary create">Save</Button>
                        { isMobile ?
                            <Link to="/" onClick={closeModal} className="btn btn-secondary">Cancel</Link>
                            :
                            <Button onClick={this.props.getBack} className="btn btn-secondary">Cancel</Button>
                        } 
                    </div>
                </form>
        )
    }
}

const mapStateToProps = (state) => {
    const { id, eventText, startTime, endTime } = state.form;
    return { id, eventText, startTime, endTime, windowWidth: state.general.windowWidth };
};


export default reduxForm({
    form: "taskForm"
  })(connect(mapStateToProps, { 
      createTask, 
      updateTask, 
      closeModal,
      setDefaults
    } )(TaskForm));
