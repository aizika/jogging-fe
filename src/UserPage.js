import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Form, FormGroup} from 'react-bootstrap';
import moment from 'moment';

// import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import RunsForm from "./RunsForm";

function isDate(str) {
    const date = new Date(str);
    return !isNaN(date);
}

class RunsFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {start: this.props.start, end: this.props.end};
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
    }

    handleStartChange = (event) => {
        event.preventDefault();
        const newStart = event.target.value;
        if (isDate(newStart)) {
            this.setState({start: newStart});
            this.props.onChange(newStart, this.state.end);
        }
    };

    handleEndChange = (event) => {
        event.preventDefault();
        const newEnd = event.target.value;
        if (isDate(newEnd)) {
            this.setState({end: newEnd});
            this.props.onChange(this.state.start, newEnd);
        }
    };

    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <label>
                            from:
                            <input name="start"
                                   type="text"
                                   value={this.state.start}
                                   onChange={this.handleStartChange}/>
                        </label>
                    </FormGroup>
                    <FormGroup>
                        <label>
                            to:
                            <input name="end"
                                   type="text"
                                   value={this.state.end}
                                   onChange={this.handleEndChange}/>
                        </label>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

class UserPage extends Component {
    constructor(props) {
        super(props);
        const end = moment().startOf('day');
        const start = end.subtract(10, 'days');

        this.state = {
            start: start.format("YYYY-MM-DD"),
            end: end.format("YYYY-MM-DD"),
            runs: this.filterRuns(start, end)
        };
    }

    dateFilter = (runDate, start, end) => {
        const date = new Date(runDate);
        const startDate = new Date(start);
        const endDate = new Date(end);
        if (isNaN(date)) {
            return true;
        }
        const cond = date.getDate() >= startDate.getDate() && date.getDate() <= endDate.getDate();
        return cond;
    };

    filterRuns = (start, end) => {
        console.log('range from: ' + start + 'to: ' + end);
        // return this.props.runs.filter((run) => (new Date(run.date) >= start && run.date <= end));
        if (this.props.runs)
            return this.props.runs.filter((run) => this.dateFilter(run.date, start, end));
        return [];
    };

    setDates = (start, end) => {
        this.setState({start: start, end: end, runs: this.filterRuns(start, end)});
    };

    render() {
        return (
            <div>
                <RunsFilter onChange={this.setDates} start={this.state.start} end={this.state.end}/>
                <RunsForm runs={this.state.runs}/>
            </div>
        );
    }
}

export default UserPage;
