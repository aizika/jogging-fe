import React, {Component} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import AuthorizeForm from "./AuthorizeForm";
import UserPage from "./UserPage";

import Request from 'react-http-request';

import './css/App.css';
import 'react-tabs/style/react-tabs.css';
import UserForm from "./UserForm";
import RestClient from "./RestClient";

function UserGreeting(props) {
    return <div>Welcome back {props.username}!</div>;
}

function GuestGreeting(props) {
    return <div>Please sign up or signin.</div>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting username={props.username}/>;
    }
    return <GuestGreeting/>;
}

class DataPage extends Component {
    render() {
        let userRuns = [];
        if (this.props.role === 'USER') {
            userRuns = new RestClient().getRuns();
        }
        return (
            <Tabs>
                <TabList>
                    {this.props.role !== 'USER' && <Tab>Users</Tab>}
                    {this.props.role !== 'MANAGER' && <Tab>Runs</Tab>}
                </TabList>

                {this.props.role !== 'USER' && <TabPanel> <UserForm users={users}/> </TabPanel>}
                {this.props.role !== 'MANAGER' && <TabPanel> <UserPage runs={userRuns}/> </TabPanel>}
            </Tabs>
        );
    }
}

// class App extends Component {
//     render() {
//         return (
//             <Request
//                 url='http://localhost:8080/users'
//                 method='get'
//                 accept='application/json'
//                 verbose={true}
//             >
//                 {
//                     ({error, result, loading}) => {
//                         if (loading) {
//                             return <div>loading...</div>;
//                         } else if (error){
//                             return <div>{JSON.stringify(error)}</div>;
//                         } else {
//                             return <div>{JSON.stringify(result)}</div>;
//                         }
//                     }
//                 }
//             </Request>
//         );
//     }
// }

class App extends Component {
    constructor() {
        super();
        this.state = {isLoggedIn: false, role: null, username: null, userId: null, runs: runs};
    }

    authorize = (props) => {
        this.setState({isLoggedIn: true, role: props.role, username: props.username, userId: props.id})
    };

    render() {
        return (
            <div>
                <div><Greeting username={this.state.username} isLoggedIn={this.state.isLoggedIn}/></div>
                <div><h2>Jogging</h2></div>
                <div>{!this.state.isLoggedIn && <AuthorizeForm onSuccess={this.authorize}/>}</div>
                <div>{this.state.isLoggedIn && <DataPage role={this.state.role} runs={this.state.runs}/>}</div>
            </div>
        );
    }
}

const runs = [
    {id: 1, date: '2017-07-23', time: '10:25', distance: 2500, duration: 10},
    {id: 2, date: '2017-07-23', time: '18:25', distance: 3500, duration: 20},
    {id: 3, date: '2017-07-24', time: '18:25', distance: 4500, duration: 30},
    {id: 4, date: '2017-07-25', time: '18:25', distance: 5500, duration: 40},
    {id: 5, date: '2017-07-26', time: '08:25', distance: 6500, duration: 50},
    {id: 6, date: '2017-07-26', time: '18:25', distance: 7500, duration: 60},
    {id: 7, date: '2017-07-27', time: '18:25', distance: 8500, duration: 70},
    {id: 8, date: '2017-07-28', time: '18:25', distance: 9500, duration: 80},
    {id: 9, date: '2017-07-29', time: '18:25', distance: 9800, duration: 90},
];

const users = [
    {id: 1, username: 'alex', email: 'alex@example.com', password: 'pass123', role: 'admin'},
    {id: 2, username: 'john', email: 'john@example.com', password: 'pass123', role: 'manager'},
    {id: 2, username: 'bob', email: 'bob@example.com', password: 'pass123', role: 'user'},
];

export default App;
