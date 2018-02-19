import React, { Component } from 'react'
import rebase, { auth, google} from "../rebase.js"
import { Row, Grid, Col } from 'react-bootstrap'
import { Route, Switch, Redirect } from "react-router-dom";
import tempPic from "../images/temp.jpg"
import Task from "./Task.js"
import ProjectTitleBar from "./ProjectTitleBar.js"
import ProjectCollaboratorsBar from "./ProjectCollaboratorsBar.js"
import "./ProjectDashboard.css"
import NewProjectButton from "../ProjectSelectorComps/NewProjectButton.js"
import CreateTaskForm from '../CreateTaskForm.js';
import App from '../App';


class ProjectDashboard extends Component {

    constructor() {
        super()
        this.state = {

        }
    }

    /*
    This currently only is the box. It needs the following:
    1) Get the color for the project from Firebase
    2) Some way of knowing if it's currently selected
    3) If it's selected, stay expanded to the square
    4) If it's selected, have the box show on the side
    */

    componentWillMount = () => {
        const newState = { ...this.state }
        newState.project = this.props.getAppState().user.projects[this.props.match.params.id]
        this.setState(newState)
    }

    render = () => {
        let color = "#3CB4CB";
        return (
                <div id="taskDashboard">
                    <ProjectTitleBar />
                    <div id="taskDashContainer">
                    </div>
                    <ProjectCollaboratorsBar />
                    <svg height="3" width="100%">
                        <line x1="12" y1="0" x2="98.5%" y2="0" style={{stroke:'#C6C6C6',strokeWidth:'3'}} />
                    </svg>

                    <Task />
                    <Task />

                    <div onClick={() => {
                        this.props.goToUrl("createtask");
                    }}><NewProjectButton /></div>


                 <Switch>
                    <Route path="/createtask" render={() => {
                        return <CreateTaskForm goToUrl={this.props.goToUrl} getAppState={this.props.getAppState}
                        setAppState={this.setAppState}/>
                    }} />

                </Switch>

                </div>
        )
    }

}

export default ProjectDashboard;
