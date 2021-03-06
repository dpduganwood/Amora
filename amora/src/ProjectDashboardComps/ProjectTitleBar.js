import React, { Component } from 'react'
import rebase from "../rebase";
import UserIcon from "./UserIcon.js"
import { checkIfManager, checkIfUserOnProject } from "../apphelpers.js"
import { emailRegistered, validateEmail } from "../apphelpers.js"
import InviteList from "../InviteList.js"
import FilterSelection from './FilterSelection.js';
// import ImageFileSelector from "react-image-select-component";
import settingsIcon from "../images/Icons/Settings.svg"
import archiveIcon from "../images/Icons/Archive.svg"
import archiveCheck from "../images/Icons/ArchiveCheck.svg"
import chatIcon from "../images/Icons/Chat.svg"
import filterIcon from "../images/Icons/Filter.svg"
import logIcon from "../images/Icons/Log.svg"

import "./ProjectTitleBar.css"
import "../textStyle.css"

import "./UserIcon.css"
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';
import Announcements from "./Announcements.js"
import "./Announcements.css"

class ProjectTitleBar extends Component {

    constructor() {
        super()

        this.state = {
            open: false,
            filterModalOpen: false,
            titleValue: "",
            projectDescription:"",
            taskAlertTime: "",
            inviteValue: "",
            categoryValue: "",
            categoryErrorValue: "",
            userList: [ ],
            userEmails: [ ],
            //categoryList: {},
            addManagerOpen: false,
            addProjectCreatorOpen: false,
            demoteManagerOpen: false,
            createNewProjectOpen: false,
            key: "",
            newtitleValue: "",
            newcolorValue: "#E74C3C",
            newdescriptionValue: "",
            isChangedTitle: false,
            isChangedDescription: false,
            profileDesc: "",
            //startWorkingHoursValue: "",
            //endWorkingHoursValue: "",
            //hours: "",
            openLog: false,
            addedAnnouncement: false,
            announcementsSynced: false,
            projectSettingsOpen: false,
            collaboratorSettingsOpen: false,
            userSettingsOpen: false,
            announcementState: {

            },
        }
    }

    // Method for changing title value in state
    changenewTitleValue = (event) => {
        const newState = { ...this.state }
        newState.newtitleValue = event.target.value
        this.setState(newState)
    }

    // Method for changing color value in state
    changenewColorValue = (color) => {
        const newState = { ...this.state }
        newState.newcolorValue = color
        this.setState(newState)
        //console.log(this.state)
    }

    changenewDescriptionValue = (event) => {
        const newState = { ...this.state }
        newState.newdescriptionValue = event.target.value
        this.setState(newState)
    }

    changeCategoryValue = (event) => {
        const newState = { ...this.state }
        newState.categoryValue = event.target.value;
        this.setState(newState)
    }

    changeStartWorkingHoursValue = (event) => {
        const newState = { ...this.state }
        newState.startWorkingHoursValue = event.target.value;
        this.setState(newState)
    }

    changeEndWorkingHoursValue = (event) => {
        const newState = { ...this.state }
        newState.endWorkingHoursValue = event.target.value;
        this.setState(newState)
    }

    componentWillMount = () => {
        const s = this.state
        s.projectDescription = this.props.projectDescription
        s.titleValue = this.props.title
        this.setState(s)
        // const promise = checkIfManager(this.props.getAppState().user.uid, this.props.getAppState().currentProject.key)
        // promise.then((data) => {
        //     if (data.val()) {
        //         const newState = this.state
        //         newState.renderAsManager = true
        //         //newState.projectDescription = this.props.projectDescription
        //         this.setState(newState)
        //     }
        // })

    }

    componentDidMount = () => {
        const newState = this.state
        newState.colorValue = this.props.getAppState().currentProject.projectColor
        this.setState(newState)
    }

    onOpenModal = () => {
        this.setState({ open: true });
      };

    onCloseModal = () => {
        this.setState({ open: false });
        this.setState({ colorValue: this.props.getProjectDashboardState().project.projectColor })
    };

    onOpenFiltersModal = () => {
        this.setState({ filterModalOpen: true });
      };

    onCloseFiltersModal = () => {
        this.setState({ filterModalOpen: false });
    };

    onOpenProjectSettings = () => {
        this.setState({
            projectSettingsOpen: true,
            collaboratorSettingsOpen: false,
            userSettingsOpen: false,
        })
    };

    onCloseProjectSettings = () => {
        this.setState({
            projectSettingsOpen: false,
            collaboratorSettingsOpen: false,
            userSettingsOpen: false,
        })
    };

    onOpenCollaboratorSettings = () => {
        this.setState({
            projectSettingsOpen: false,
            collaboratorSettingsOpen: true,
            userSettingsOpen: false,
        })
    };

    onCloseCollaboratorSettings = () => {
        this.setState({
            projectSettingsOpen: false,
            collaboratorSettingsOpen: false,
            userSettingsOpen: false,
        })
    };

    onOpenUserSettings = () => {
        this.setState({
            projectSettingsOpen: false,
            collaboratorSettingsOpen: false,
            userSettingsOpen: true,
        })
    };

    onCloseUserSettings = () => {
        this.setState({
            projectSettingsOpen: false,
            collaboratorSettingsOpen: false,
            userSettingsOpen: false,
        })
    };

    changeTitleValue = (event) => {
        const newState = { ...this.state }
        newState.titleValue = event.target.value
        this.setState(newState)
        this.setState({isChangedTitle: true})
    }

    changeDescriptionValue = (event) => {
        const newState = { ...this.state }
        newState.projectDescription = event.target.value
        this.setState(newState)
        this.setState({isChangedDescription: true})
    }

    validCategory = (category) => {
        if(this.props.getProjectDashboardState().project.taskCategories[category] !== true){
            return true;
        } else {
            return false;
        }
    }

    addCategory = () => {
        if (this.state.categoryValue === ""){
            return;
        }

        const newDashBoardState = this.props.getProjectDashboardState();
        const newState = { ...this.state }
        if (!this.validCategory(this.state.categoryValue)){
             newState.categoryErrorValue = "You already added that category"
             this.setState(newState)
             return;
        }
        newDashBoardState.project.taskCategories[this.state.categoryValue] = true;
        this.props.setProjectDashboardState(newDashBoardState)
        newState.categoryErrorValue = "";
        newState.categoryValue = "";
        this.setState(newState)
    }

    // updateWorkingHours = () => {
    //     //still need to do this
    //     if (this.state.hours == 0){
    //         return;
    //     }
    //     const newDashBoardState = this.props.getProjectDashboardState();
    //     const newState = { ...this.state }
    //     //newDashBoardState.project.taskCategories[this.state.workingHoursValue] = true;
    //     this.props.setProjectDashboardState(newDashBoardState)
    //     newState.workingHoursValue = "";
    //     this.setState(newState)
    // }



    submitChanges = () => {
         var dropSelect = document.getElementById("taskAlertDropdown");
         var taskAlertText = dropSelect.options[dropSelect.selectedIndex].text;

        var dropSelectStartTime = document.getElementById("updateStartHoursDropdown");
        var startAMPMText = dropSelectStartTime.options[dropSelectStartTime.selectedIndex].text;

        var dropSelectEndTime = document.getElementById("updateEndHoursDropdown");
        var endAMPMText = dropSelectEndTime.options[dropSelectEndTime.selectedIndex].text;

         const newState = this.props.getAppState();

        let startpm = this.state.startWorkingHoursValue
        let endpm = this.state.endWorkingHoursValue
        if (startAMPMText == "pm") {
            startpm = +this.state.startWorkingHoursValue+12
        }
        else {
            startpm = +this.state.startWorkingHoursValue+0
        }
        if (endAMPMText == "pm") {
            endpm = +this.state.endWorkingHoursValue+12
        }
        else {
            endpm = +this.state.endWorkingHoursValue+0
        }

        let hrs = 0
        if ((endpm-startpm) < 0) {
            hrs = Math.abs(Math.abs(endpm-startpm)-24)
        }
        else {
            hrs = endpm-startpm
        }

        if (!isNaN(startpm) && !isNaN(endpm)) {
            rebase.fetch(`users/${this.props.getAppState().user.uid}/workingHours`, {
            }).then(data => {
                    rebase.update(`users/${this.props.getAppState().user.uid}/workingHours`, {
                        data: {
                            hours: hrs,
                            end: endpm
                        }
                    })
            })
            rebase.fetch(`users/${this.props.getAppState().user.uid}/workingHours`, {
            }).then(data => {
                    rebase.update(`users/${this.props.getAppState().user.uid}/workingHours`, {
                        data: {
                            start: startpm
                        }
                    })
            })
        }

        if(this.props.getProjectDashboardState().project.managerList[this.props.getAppState().user.uid]){
            newState.currentProject.projectName = this.state.titleValue
            newState.currentProject.projectColor = this.state.colorValue
            newState.currentProject.projectDescription = this.state.projectDescription
            newState.currentProject.taskAlertTime = taskAlertText
            this.props.setAppState(newState)

            rebase.update(`projects/${this.props.getAppState().currentProject.key}`, { //Update project
                data: {
                    projectName: this.state.titleValue,
                    projectColor: this.state.colorValue,
                    projectDescription: this.state.projectDescription,
                }
            })
            rebase.update(`users/${this.props.getAppState().user.uid}/projects/${this.props.getAppState().currentProject.key}`, { //Update in user's project list
                data: {
                    projectName: this.state.titleValue,
                    projectColor: this.state.colorValue,
                    projectDescription: this.state.projectDescription,
                    taskAlertTime: taskAlertText,
                }
            })

            const newKey = this.props.getProjectDashboardState().project.key
            const notification = {
                type: "invite",
                projectName: this.props.getProjectDashboardState().project.projectName,
                projectColor: this.props.getProjectDashboardState().project.projectColor,
                projectPhotoURL: this.props.getProjectDashboardState().project.projectPhotoURL,
                projectDescription: this.props.getProjectDashboardState().project.projectDescription,
                key: newKey,
                taskAlertTime: taskAlertText,
            }
            this.state.userList.map((user) => {
                if (user.email !== this.props.getAppState().user.email) {
                    rebase.update(`users/${user.uid}/notifications/${newKey}`, {
                        data: notification
                    })
                }
            })
            if (this.state.isChangedTitle) {
                var now = new Date()
                rebase.fetch(`projects/${this.props.getAppState().currentProject.key}`, {
                    context: this,
                    then(projData){
                        rebase.push(`projects/${this.props.getAppState().currentProject.key}/events`, {
                            data: {
                                event: " changed project name to " + "\"" + this.state.titleValue + "\"",
                                timestamp: now.getMonth()+1 + "/" + now.getDate() + "/" + now.getFullYear(),
                                useid: this.props.getAppState().user.displayName
                            }
                        })
                    }
                })
                this.setState({isChangedTitle: false})
            }
            if (this.state.isChangedDescription) {
                var now = new Date()
                rebase.fetch(`projects/${this.props.getAppState().currentProject.key}`, {
                    context: this,
                    then(projData){
                        rebase.push(`projects/${this.props.getAppState().currentProject.key}/events`, {
                            data: {
                                event: " changed project description to " + "\"" + this.state.projectDescription + "\"",
                                timestamp: now.getMonth()+1 + "/" + now.getDate() + "/" + now.getFullYear(),
                                useid: this.props.getAppState().user.displayName
                            }
                        })
                    }
                })
                this.setState({isChangedDescription: false})
            }
        } else {
            newState.currentProject.taskAlertTime = taskAlertText
            this.props.setAppState(newState)

            rebase.update(`users/${this.props.getAppState().user.uid}/projects/${this.props.getAppState().currentProject.key}`, { //Update in user's project list
                data: {
                    taskAlertTime: taskAlertText,
                }
            })
        }

        this.submitProfileChanges()
        // this.sleep(500).then(() => {
        //     this.finish()
        //     this.sleep(5000).then(() => {
        //         this.props.goToUrl("/projects/-LATpytm2IFRsTsOiV5T")
        //         console.log("tried")
        //         this.sleep(500).then(() => {
        //             this.props.goToUrl("/projects/-LATpytm2IFRsTsOiV5T")
        //             console.log("tried")
        //             this.sleep(500).then(() => {
        //                 this.props.goToUrl("/projects/-LATpytm2IFRsTsOiV5T")
        //                 console.log("tried")
        //                 this.sleep(500).then(() => {
        //                     this.props.goToUrl("/projects/-LATpytm2IFRsTsOiV5T")
        //                     console.log("tried")
        //                 })
        //             })
        //         })
        //     })
        // })
        // const dashboardState = { ...this.props.getProjectDashboardState() }
        // dashboardState.project.projectSynced = true
        // this.props.setProjectDashboardState(dashboardState)




    }

     sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      }

    finish = () => {
        window.location.reload();
    }

    changeColorValue = (color) => {
        const newState = { ...this.state }
        newState.colorValue = color
        this.setState(newState)
    }

    emailValidationProcess = () => {
        if (this.state.inviteValue === "") {
            return false
        }

        const newState = { ...this.state }
        if (!validateEmail(this.state.inviteValue)) {
            newState.errorValue = "Please enter a valid email address..."
            this.setState(newState)
            return false
        }

        if (this.state.inviteValue === this.props.getAppState().user.email) {
            newState.errorValue = "Thats already a user in this project..."
            this.setState(newState)
            return false
        }

        const promise = emailRegistered(this.state.inviteValue)
        promise.then((data) => {
            if (!data.val()) {
                newState.errorValue = "That email address has not been registered with Amora..."
                this.setState(newState)
                return false
            }
            if (this.state.userEmails.includes(this.state.inviteValue)) {
                newState.errorValue = "You've already invited that user..."
                this.setState(newState)
                return false
            }
            const valKeys = Object.keys(data.val())
            const person = data.val()[valKeys[0]]
            const projectKeys = Object.keys(person.projects)
            if (projectKeys.includes(this.props.getProjectDashboardState().project.key)) {
                newState.errorValue = "That user is already in this project..."
                this.setState(newState)
                return false
            }
            const newKey = Object.keys(data.val())
            newState.errorValue = ""
            newState.inviteValue = "";
            newState.userList.push(data.val()[newKey])
            newState.userEmails.push(this.state.inviteValue)
            this.setState(newState)
            //console.log(data.val()[newKey])
            return true
        })
    }

    // Method for changins invite value in state
    changeInviteValue = (event) => {
        const newState = { ...this.state }
        newState.inviteValue = event.target.value;
        this.setState(newState)
    }

    demoteManager = (key) => {
        const dashboardState = { ...this.props.getProjectDashboardState() }
        dashboardState.project.managerList[key] = null
        this.props.setProjectDashboardState(dashboardState)
        // this.sendManagerNotification(key)
        this.setState({demoteManagerOpen: false})
    }

    assignManager = (key) => {
        const dashboardState = { ...this.props.getProjectDashboardState() }
        dashboardState.project.managerList[key] = true
        this.props.setProjectDashboardState(dashboardState)
        // this.sendManagerNotification(key)
        this.setState({addManagerOpen: false})
    }

    assignProjectCreator = (key) => {
        const dashboardState = { ...this.props.getProjectDashboardState() }
        dashboardState.project.projectCreator = key
        dashboardState.project.managerList[key] = true
        this.props.setProjectDashboardState(dashboardState)
        // this.sendProjectCreatorNotification(key)
        this.setState({addProjectCreatorOpen: false})
    }

    sendmanagerNotification = (id) => {
        const notification = {
            type: "assignment",
            projectName: this.props.getProjectDashboardState().project.projectName,
            projectColor: this.props.getProjectDashboardState().project.projectColor,
            projectPhotoURL: this.props.getProjectDashboardState().project.projectPhotoURL,
            taskName: this.props.task.taskName
        }
        rebase.update(`users/${id}/notifications/${this.props.taskKey}`, {
            data: notification
        })
    }

    deleteProject = () => {
        var response = window.confirm("Are you sure you want to delete this project?")
        if ( response==true ){
        let projectUserList = [];
        let usersList = [];
        let projectKey = this.props.getProjectDashboardState().project.key
        rebase.fetch(`projects/${this.props.getProjectDashboardState().project.key}/userList`, {
            context: this,
        }).then(data => {
            usersList = Object.keys(data);
            var i = 0;
            for (i; i < usersList.length;i++ ){
                let uid = usersList[i];
                rebase.remove(`users/${uid}/projects/${projectKey}`)
            }
            rebase.remove(`projects/${projectKey}`)
         })
    }
}
    postAnnouncement = (text) => {
        let projectID = this.props.getProjectDashboardState().project.key
        let announcement = document.getElementById("AnnounceField").value
        var today = new Date();
        var unformattedTime = today.getTime()
        var date = new Date(unformattedTime)
        let formattedDate =  date.toLocaleTimeString() + " on " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()

            rebase.push(`projects/${projectID}/announcements`, {
                data: {
                    text: announcement,
                    timestamp: formattedDate
                }
            });


        this.setState({addedAnnouncement: true})
        this.clearAnnouncement()
    }

    clearAnnouncements = () =>{
        let projectUserList = [];
        let annList = [];
        let projectKey = this.props.getProjectDashboardState().project.key
        rebase.fetch(`projects/${this.props.getProjectDashboardState().project.key}/announcements`, {
            context: this,
        }).then(data => {
            annList = Object.keys(data);
            var i = 0;
            for (i; i < annList.length;i++ ){
                let annID = annList[i];
                rebase.remove(`projects/${projectKey}/announcements/${annID}`)
            }
         })

    }

       sendAnnouncement = (event) => {
        const newState = { ...this.state }
        newState.announcementValue = event.target.value
        this.setState(newState)
    }

        clearAnnouncement = () => {
        const newState = { ...this.state }
        newState.announcementValue = ''
        this.setState(newState)
    }


    createVanillaProject = () => {
        if (this.state.newdescriptionValue === "" || this.state.newtitleValue === "") {
            return
        }
            rebase.push("projects", {
                data: {
                    projectName: this.state.newtitleValue,
                    projectColor: this.state.newcolorValue,
                    projectCreator: this.props.getProjectDashboardState().project.projectCreator,
                    projectPhotoURL: this.props.getProjectDashboardState().project.projectPhotoURL,
                    projectDescription: this.state.newdescriptionValue,
                    isPersonalDashboardProject: false,
                }
            }).then((newLocation) => {
                let newState = { ...this.state }
                newState.key = newLocation.key
                this.setState(newState)
                rebase.post(`projects/${newLocation.key}/managerList`, { //create list of managers within project, and add the user to it
                    data: {
                        [this.props.getAppState().user.uid]: true
                    }
                })
                rebase.post(`projects/${newLocation.key}/userList`, { //create list users on project, and add user to it
                    data: {
                        [this.props.getAppState().user.uid]: this.props.getAppState().user.photoURL
                    }
                })
                rebase.update(`projects/${newLocation.key}`, {
                    data: {
                        key: newLocation.key
                    }
                }).then((data) => {
                    rebase.fetch(`projects/${this.state.key}`, {
                        then: (dat) => {
                            const key = this.state.key
                            const notification = {
                                type: "invite",
                                projectName: dat.projectName,
                                projectColor: dat.projectColor,
                                projectPhotoURL: dat.projectPhotoURL,
                                projectDescription: dat.projectDescription,
                                key: key,
                                taskAlertTime: this.props.getAppState().user.projects[this.props.getProjectDashboardState().project.key].taskAlertTime
                            }
                            const userProject = {
                                projectName: dat.projectName,
                                projectPhotoURL: dat.projectPhotoURL,
                                key: key,
                                projectColor: dat.projectColor,
                                projectDescription: dat.projectDescription,
                                isPersonalDashboardProject: "false",
                                taskAlertTime: this.props.getAppState().user.projects[this.props.getProjectDashboardState().project.key].taskAlertTime,
                            }
                            rebase.update(`users/${this.props.getAppState().user.uid}/projects/${key}`, {
                                data: userProject
                            })
                            const userKeys = Object.keys(this.props.getProjectDashboardState().project.userList)
                            userKeys.map((key) => {
                                if (key !== this.props.getAppState().user.uid) {
                                    rebase.update(`users/${key}/notifications/${this.state.key}`, {
                                        data: notification
                                    })
                                }
                            })
                        }
                    })
                })
            })

    }

    renderProjectCreatorButton = () => {
        return (
            <div>
            <button class="addCommentButton" style={{marginRight: '5px'}} onClick={() => {
                this.setState({addProjectCreatorOpen: true})
            }}>Change Creator</button>
            <button class="addCommentButton" style={{marginRight: '5px'}} onClick={() => {
                this.setState({demoteManagerOpen: true})
            }}>Demote Manager</button>
            </div>
        )
    }

    renderSwatch = (color) => {
        if (color == this.state.colorValue) {
        //if(color == this.props.getProjectDashboardState().project.projectColor){
            return <div onClick={() => {
                this.changeColorValue(color)
            }} className="colorSwatchSelector" key={color} style={{backgroundColor: color, borderWidth: '2px', borderStyle: 'solid'}}></div>
        } else {
            return <div onClick={() => {
                this.changeColorValue(color)
            }} className="colorSwatchSelector" key={color} style={{backgroundColor: color}}></div>
        }
    }

    rendernewSwatch = (color) => {
        if (color == this.state.newcolorValue) {
            return <div onClick={() => {
                this.changenewColorValue(color)
            }} className="colorSwatchSelector" key={color} style={{backgroundColor: color, borderWidth: '2px', borderStyle: 'solid'}}></div>
        } else {
            return <div onClick={() => {
                this.changenewColorValue(color)
            }} className="colorSwatchSelector" key={color} style={{backgroundColor: color}}></div>
        }
    }

    changeProfilePicture = (uri) => {
        const newState = { ...this.props.getAppState() }
        newState.user.photoURL = uri
        this.props.setAppState(newState)
        const projectIds = Object.keys(this.props.getAppState().user.projects)
        for (let i = 0; i < projectIds.length; i++) {
            //console.log(`projects/${projectIds[i]}/userList/${this.props.getAppState().user.uid}`)
            rebase.post(`projects/${projectIds[i]}/userList/${this.props.getAppState().user.uid}`, {
                data: uri
            })
        }
    }

    previewFile = () => {
        const reader  = new FileReader()
        const file = document.querySelector('input[type=file]').files[0]
        //console.log(file)
        reader.onloadend = () => {
           this.changeProfilePicture(reader.result)
        }
        reader.readAsDataURL(file)
    }

    submitProfileChanges = () => {
        //console.log(this.state.profileDesc)
        rebase.update(`users/${this.props.getAppState().user.uid}`, {
            data: {
                profileDescription: this.state.profileDesc
            }
        })

        //update the color of each project
        //console.log(this.props.getAppState().user.uid)
        //console.log(this.props.project.key)
    const ID = this.props.getAppState().user.uid
    rebase.fetch(`users/${ID}/todayView/`, {
        context: this,
        asArray: true,
        then(data){
            //console.log(data);
            var tasks = (Object.values(data))
            var taskArray = (Object.keys(data))
            //console.log(taskArray)
            for (var i = 0; i < tasks.length;i++ ){
                let tid = tasks[i].taskIDNumber;
                let remember = tasks[i].key
                //console.log(tasks)
                //console.log(tid)
                //console.log(this.props.project.key)
                rebase.fetch(`projects/${this.props.project.key}/taskList`, {
                    context: this,
                    asArray: true,
                }).then(data1 => {
                    //console.log(data1)
                    //console.log(tid)
                    for (var i = 0; i < data1.length; i++){
                        //console.log(data1[i])
                        //console.log(data1[i].key)
                        //console.log(tid)
                        if (data1[i].key === tid){

                            rebase.update(`users/${ID}/todayView/${remember}/`, {
                                data: {color: this.props.projectColor}
                            });
                        }
                    }
                    // if (data1.taskIDNumber === this.props.taskKey){
                    //     console.log(tid)
                    //     //update the estimated time field

                    //     rebase.update(`users/${ID}/todayView/${tid}/`, {
                    //         data: {color: this.props.projectColor}
                    //     });
                    // }
                })
            }
        }
    });



    rebase.fetch(`users/${ID}/todayView/`, {
        context: this,
        asArray: true,
        then(data){
            //console.log(data);
            var tasks = (Object.values(data))
            var taskArray = (Object.keys(data))
            //console.log(taskArray)
            for (var i = 0; i < tasks.length;i++ ){
                let tid = tasks[i].taskIDNumber;
                let remember = tasks[i].key
                //console.log(tasks)
                //console.log(tid)
                //console.log(this.props.project.key)
                rebase.fetch(`projects/${this.props.project.key}/archivedTaskList`, {
                    context: this,
                    asArray: true,
                }).then(data1 => {
                    //console.log(data1)
                    //console.log(tid)
                    for (var i = 0; i < data1.length; i++){
                        //console.log(data1[i])
                        //console.log(data1[i].key)
                        //console.log(tid)
                        if (data1[i].key === tid){

                            rebase.update(`users/${ID}/todayView/${remember}/`, {
                                data: {color: this.props.projectColor}
                            });
                        }
                    }
                    // if (data1.taskIDNumber === this.props.taskKey){
                    //     console.log(tid)
                    //     //update the estimated time field

                    //     rebase.update(`users/${ID}/todayView/${tid}/`, {
                    //         data: {color: this.props.projectColor}
                    //     });
                    // }
                })
            }
        }
    });


    }

    changeProfileDesc = (event) => {
        const newState = { ...this.state }
        newState.profileDesc = event.target.value
        this.setState(newState)
    }

    renderUserSettings = () => {
        const images = [
            "https://www.healthypawspetinsurance.com/Images/V3/DogAndPuppyInsurance/Dog_CTA_Desktop_HeroImage.jpg",
            "https://www.petmd.com/sites/default/files/petmd-cat-happy-10.jpg",
            "https://abcbirds.org/wp-content/uploads/bfi_thumb/Action-Alert_homepage-thumbnal_MBTA_Scarlet-Tanager_Greg-Lavaty-342pigqom0tq9fn9anrnre.jpg"
        ]
        return (
            <div>
                <p className="text_header" style={{marginTop: '14px'}}>User Settings</p>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <p className="text_description">Update Profile Description</p>
                    <input type="text" placeholder="Profile description" className="commentInput"
                    onChange={this.changeProfileDesc} value={this.state.profileDesc} style={{marginTop: '-5px', marginLeft: '7px', width: '60%'}}></input>
                </div>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <p className="text_description">Update Profile Photo</p>
                    <div style={{marginLeft: '45px'}}>
                        {images.map((imageUrl) => {
                            return this.renderProfileImage(imageUrl)
                        })}
                    </div>
                </div>

            </div>
        )
    }

    renderProfileImage = (imageUrl) => {
        return <img src={imageUrl} alt={"Animal"} className="profileImageSelect" onClick={() => {
            this.changeProfilePicture(imageUrl)
        }} />
    }

    renderCollaboratorSettings = (color, colors) => {

        let userKeys
        if (this.props.project.userList) {
            userKeys = Object.keys(this.props.project.userList)
        }

        let isProjectOwner = false
        if (this.props.getProjectDashboardState().project.projectCreator == this.props.getAppState().user.uid) {
            isProjectOwner = true
        }

        let creatorButtons
        if (isProjectOwner) {
            creatorButtons = this.renderProjectCreatorButton()
        }



        return (
            <div>
                <p className="text_header" style={{marginTop: '14px'}}>Collaborator Settings</p>

                <div style={{display: 'flex', 'flex-direction': 'row', 'margin-left': '0px', marginTop: '5px'}}>
                {creatorButtons}
                <button class="addCommentButton" style={{marginRight: '5px'}} onClick={() => {
                    this.setState({createNewProjectOpen: true})
                }}>Duplicate Team</button>
                <button class="addCommentButton" style={{marginRight: '5px'}} onClick={() => {
                    this.setState({addManagerOpen: true})
                }}>Promote User</button></div>
                <Modal open={this.state.addProjectCreatorOpen} onClose={() => this.setState({addProjectCreatorOpen: false})} little classNames={{overlay: 'assignUserOverlay', modal: 'promoteToCreatorModal'}}>
                        <div>
                            <h4 className="taskAssignmentInstructions" style={{"text-align": "left", "margin-top": "5px"}}>Promote User to Creator</h4>
                            <div id="ProjectCollaboratorsBarContainter" style={{"background-color": "white", "margin-bottom": "15px", "margin-left": "-7px", width: '350px', "overflow": "scrollable"}}>
                                {userKeys && userKeys.map((key) => {
                                    if (key != this.props.project.projectCreator) {
                                        return (
                                            <UserIcon color={this.props.getProjectDashboardState().project.projectColor}
                                            getAppState={this.props.getAppState} projectID={this.props.getProjectDashboardState().project.key}
                                            onClick={() => {
                                                this.assignProjectCreator(key)
                                            }} key={key} user={this.props.project.userList[key]} userID={key} project={this.props.project} />
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </Modal>

                <Modal open={this.state.demoteManagerOpen} onClose={() => this.setState({demoteManagerOpen: false})} little classNames={{overlay: 'assignUserOverlay', modal: 'demoteManagerModal'}}>
                    <div>
                        <h4 className="taskAssignmentInstructions" style={{"text-align": "left", "margin-top": "5px"}}>Select a Manager to Demote</h4>
                        <div id="ProjectCollaboratorsBarContainter" style={{"background-color": "white", "margin-bottom": "15px", "margin-left": "-7px", width: '350px', "overflow": "scrollable"}}>
                            {userKeys && userKeys.map((key) => {
                                if (Object.keys(this.props.project.managerList).includes(key) && key != this.props.getAppState().user.uid) {
                                    return (
                                        <UserIcon color={this.props.getProjectDashboardState().project.projectColor}
                                        getAppState={this.props.getAppState} projectID={this.props.getProjectDashboardState().project.key}
                                        onClick={() => {
                                            this.demoteManager(key)
                                        }} key={key} user={this.props.project.userList[key]} userID={key} project={this.props.project} />
                                    )
                                }
                            })}
                        </div>
                    </div>
                </Modal>
                <Modal open={this.state.createNewProjectOpen} onClose={() => this.setState({createNewProjectOpen: false})} little classNames={{overlay: 'assignUserOverlay', modal: 'copyProjectModal'}}>
                        <h4 className="taskAssignmentInstructions" style={{"text-align": "left", "margin-top": "5px"}}>Create Project with Duplicate Team</h4>
                        <div id="ProjectCollaboratorsBarContainter" style={{"background-color": "white", "margin-bottom": "15px", "margin-left": "-7px", width: '400px', "display": "flex", "flex-direction": "column"}}>
                            <input type="text" placeholder="Enter Project Name" style={{marginLeft:'15px', width:'65%', backgroundColor:'white'}} className="createProjectInput" onChange={this.changenewTitleValue}
                            value={this.state.newtitleValue} />
                            <input type="text" placeholder="Enter Project Description" style={{marginLeft:'15px', width:'65%', backgroundColor:'white'}} className="createProjectInput"
                            onChange={this.changenewDescriptionValue} value={this.state.newdescriptionValue} />
                        <div id="colorPicker" style={{width: '400px'}}>
                                <div><h4>Project Color:</h4></div>
                                {colors.map((color) => {
                                    return this.rendernewSwatch(color)
                                })}
                            </div>
                            <button className="addCommentButton" style={{marginLeft: '15px', marginTop: '10px', marginBottom: '0px'}} onClick={() => {
                                this.createVanillaProject()
                            }}>Submit</button>
                        </div>
                </Modal>
                <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <div id="addUserIconProjectContainer" title="Invite User" style={{marginLeft: '0px'}} onClick={this.emailValidationProcess}>
                        <svg height="23" width="23">
                            <line x1="4" y1="9" x2="15" y2="9" style={{strokeWidth: '2px'}} className="newProjectUserPlus" />
                            <line x1="9.5" y1="4" x2="9.5" y2="15" style={{strokeWidth: '2px'}} className="newProjectUserPlus" />
                        </svg>

                    </div>

                    <Modal open={this.state.addManagerOpen} onClose={() => this.setState({addManagerOpen: false})} little classNames={{overlay: 'assignUserOverlay', modal: 'promoteUserToManagerModal'}}>
                        <div>
                            <h4 className="taskAssignmentInstructions" style={{"text-align": "left", "margin-top": "5px"}}>Promote User to Manager</h4>
                            <div id="ProjectCollaboratorsBarContainter" style={{"background-color": "white", "margin-bottom": "15px", "margin-left": "-7px", width: '350px', "overflow": "scrollable"}}>
                                {userKeys && userKeys.map((key) => {
                                    if (!Object.keys(this.props.project.managerList).includes(key)) {
                                        return (
                                            <UserIcon color={this.props.getProjectDashboardState().project.projectColor}
                                            getAppState={this.props.getAppState} projectID={this.props.getProjectDashboardState().project.key}
                                            onClick={() => {
                                                this.assignManager(key)
                                            }} key={key} user={this.props.project.userList[key]} userID={key} project={this.props.project} />
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </Modal>
                    <input type="text" placeholder="Email of person you'd like to invite" style={{marginLeft:'0px', width:'100%'}} className="commentInput"
                        value={this.state.inviteValue} onChange={this.changeInviteValue} />

                    <div>
                        <p className="errorBox">{this.state.errorValue}</p>
                    </div>
                    <InviteList uid={this.props.getAppState().user.uid} users={this.state.userList} />
                </div>

                <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginLeft: '-15px'}}>
                        <div id="addUserIconProjectContainer" title="Invite User" onClick={this.addCategory}>
                            <svg height="23" width="23">
                                <line x1="4" y1="9" x2="15" y2="9" style={{strokeWidth: '2px'}} className="newProjectUserPlus" />
                                <line x1="9.5" y1="4" x2="9.5" y2="15" style={{strokeWidth: '2px'}} className="newProjectUserPlus" />
                            </svg>
                        </div>
                        <input type="text" placeholder="Name of task category you'd like to add" className="commentInput"
                            value={this.state.categoryValue} onChange={this.changeCategoryValue} style={{width: '500px'}}/>

                    <div >
                        <p className="errorBox">{this.state.categoryErrorValue}</p>
                    </div>
                </div>
            </div>
        )
    }

    renderUsersSettings = (color, colors) => {

        return (
            <div>
                {this.renderUserSettings()}

                <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: '7px'}}>
                    <p className="text_description" style={{marginRight: '25px', marginTop: '7px'}}>Change Working Hours:</p>
                    <input type="text" placeholder="start" className="commentInput"
                        value={this.state.startWorkingHoursValue} onChange={this.changeStartWorkingHoursValue} style={{width: '10%', marginTop: '5px'}}/>
                    <select name="updateStartHoursDropdown" id="updateStartHoursDropdown" className="commentInput" style={{width: '50px', marginTop: '5px'}}>
                        <option value="1">am</option>
                        <option value="2">pm</option>
                    </select>

                    <input type="text" placeholder="end" className="commentInput"
                        value={this.state.endWorkingHoursValue} onChange={this.changeEndWorkingHoursValue} style={{width: '10%', marginTop: '5px'}}/>
                    <select name="updateEndHoursDropdown" id="updateEndHoursDropdown" className="commentInput" style={{width: '50px', marginTop: '5px'}}>
                        <option value="1">am</option>
                        <option value="2">pm</option>
                    </select>
                </div>

                <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <p className="text_description" style={{marginRight: '20px', marginTop: '7px'}}>Default Task Alert Time:</p>
                    <select name="taskAlertDropdown" id="taskAlertDropdown" className="commentInput" style={{width: '70px', marginTop: '5px'}}>
                        <option value="1">None</option>
                        <option value="2">5 minutes</option>
                        <option value="3">10 minutes</option>
                        <option value="4">15 minutes</option>
                        <option value="5">20 minutes</option>
                        <option value="6">30 minutes</option>
                        <option value="7">60 minutes</option>
                    </select>
                </div>

                <div>
                    <button className="addCommentButton" style={{marginLeft:'0px', marginBottom: '0px', width: '100px'}} onClick={this.submitChanges}>Submit</button>
                </div>
            </div>
        )
    }

    renderProjectSettings = (color, colors) => {
        let colorsArray = ['#E74C3C', '#E67E22', '#F1C40F', '#E91E63', '#9B59B6', '#3498DB', '#2ECB71', '#18AE90']
       if(this.props.getProjectDashboardState().project.isPersonalDashboardProject == false){
        return (
            <div>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <p className="text_header">Project Settings</p>
                    <p className="text_description" id="clearAnnouncementsText" onClick={this.deleteProject} style={{marginLeft: '7px'}}>| <i>Delete Project</i></p>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', 'justify-content': 'space-between', width: '100%', marginTop: '0px'}}>
                    <p className="text_description">Update Name:</p>
                    <input type="text" placeholder="Enter Project Name" style={{marginLeft:'15px', width:'65%', marginTop: '-2px'}} className="commentInput" onChange={this.changeTitleValue} value={this.state.titleValue} />
                </div>
                <div style={{display: 'flex', flexDirection: 'row', 'justify-content': 'space-between', width: '100%', marginTop: '0px'}}>
                    <p className="text_description">Update Description:</p>
                    <input type="text" className="commentInput" style={{marginLeft:'0px', width:'65%', marginTop: '-2px'}} onChange={this.changeDescriptionValue} value={this.state.projectDescription}/>
                </div>

                <div id="colorPicker" style={{marginLeft:'0px', marginTop: '5px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <p className="text_description">Update Color:</p>
                    <div style={{display: 'flex', flexDirection: 'row', marginTop: '-10px'}}>
                        {colorsArray.map((color) => {
                            return this.renderSwatch(color)
                        })}
                    </div>
                </div>

                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <p className="text_header">Add Announcement</p>
                    <p className="text_description" id="clearAnnouncementsText" onClick={this.clearAnnouncements}><i>Clear Announcements</i></p>
                </div>

                <input type="text" name="Announce" id="AnnounceField" onChange={this.sendAnnouncement} value={this.state.announcementValue} placeholder="Enter Announcement" className="commentInput" style={{width: '100%', marginTop: '0px'}}/>
                <svg width="15px" height="18px" id="sendCommentArrow" onClick={this.postAnnouncement}>
                    <title>Combined Shape</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                        <g id="Reiterate-on-Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Desktop" transform="translate(-772.000000, -493.000000)" fill="#B8B8B8">
                                <path d="M783.7,509.5 L788.5,509.5 L779.5,494.5 L770.5,509.5 L775.3,509.5 L779.5,502.5 L783.7,509.5 Z" id="Combined-Shape" transform="translate(779.500000, 502.000000) rotate(90.000000) translate(-779.500000, -502.000000) "></path>
                            </g>
                        </g>
                </svg>
            </div>
        )}
        else{
            return (
                <div>

                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <p className="text_header">Project Settings</p>
                        {/* <p className="text_description" id="clearAnnouncementsText" onClick={this.deleteProject} style={{marginLeft: '7px'}}>| <i>Delete Project</i></p> */}
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', 'justify-content': 'space-between', width: '100%', marginTop: '0px'}}>
                        <p className="text_description">Update Name:</p>
                        <input type="text" placeholder="Enter Project Name" style={{marginLeft:'15px', width:'65%', marginTop: '-2px'}} className="commentInput" onChange={this.changeTitleValue} value={this.state.titleValue} />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', 'justify-content': 'space-between', width: '100%', marginTop: '0px'}}>
                        <p className="text_description">Update Description:</p>
                        <input type="text" className="commentInput" style={{marginLeft:'0px', width:'65%', marginTop: '-2px'}} onChange={this.changeDescriptionValue} value={this.state.projectDescription}/>
                    </div>

                    <div id="colorPicker" style={{marginLeft:'0px', marginTop: '5px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <p className="text_description">Update Color:</p>
                        <div style={{display: 'flex', flexDirection: 'row', marginTop: '-10px'}}>
                            {colorsArray.map((color) => {
                                return this.renderSwatch(color)
                            })}
                        </div>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <p className="text_header">Add Announcement</p>
                        <p className="text_description" id="clearAnnouncementsText" onClick={this.clearAnnouncements}><i>Clear Announcements</i></p>
                    </div>

                    <input type="text" name="Announce" id="AnnounceField" onChange={this.sendAnnouncement} value={this.state.announcementValue} placeholder="Enter Announcement" className="commentInput" style={{width: '100%', marginTop: '0px'}}/>
                    <svg width="15px" height="18px" id="sendCommentArrow" onClick={this.postAnnouncement}>
                        <title>Combined Shape</title>
                        <desc>Created with Sketch.</desc>
                        <defs></defs>
                            <g id="Reiterate-on-Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Desktop" transform="translate(-772.000000, -493.000000)" fill="#B8B8B8">
                                    <path d="M783.7,509.5 L788.5,509.5 L779.5,494.5 L770.5,509.5 L775.3,509.5 L779.5,502.5 L783.7,509.5 Z" id="Combined-Shape" transform="translate(779.500000, 502.000000) rotate(90.000000) translate(-779.500000, -502.000000) "></path>
                                </g>
                            </g>
                    </svg>
                </div>
            )


        }

    }

    //Returns what should be rendered in the settings pane
    renderSettings = (color, colors) => {

        let userKeys
        if (this.props.project.userList) {
            userKeys = Object.keys(this.props.project.userList)
        }
        let isProjectOwner = false
        if (this.props.getProjectDashboardState().project.projectCreator == this.props.getAppState().user.uid) {
            isProjectOwner = true
        }
        let creatorButtons
        if (isProjectOwner) {
            creatorButtons = this.renderProjectCreatorButton()
        }
        let colorsArray = ['#E74C3C', '#E67E22', '#F1C40F', '#E91E63', '#9B59B6', '#3498DB', '#2ECB71', '#18AE90']
        let userSettings = this.renderUserSettings()

        if(!this.props.getProjectDashboardState().projectSynced){
            return (<div>
                <p></p>
            </div>)
        } else if(!this.props.getProjectDashboardState().project.managerList[this.props.getAppState().user.uid]){ //user is not a manager
            return (
                <div style={{width: '500px'}}>
                    {this.renderUsersSettings(color, colors)}
                </div>

            )
        } else { //user is a manager

            const { projectSettingsOpen } = this.state;
            const { collaboratorSettingsOpen } = this.state;
            const { userSettingsOpen } = this.state;
            /*let projectSettings = this.renderProjectSettings()
            let collaboratorSettings = this.renderCollaboratorSettings()
            let userSettings = this.renderUserSettings()*/
            return (

                <div style={{width: '500px'}}>

                    {this.renderProjectSettings(color, colors)}
                    {this.renderCollaboratorSettings(color, colors)}
                    {this.renderUsersSettings(color, colors)}

                </div>
            )
        }

    }

    /*
    This currently only is the box. It needs the following:
    1) Get the color for the project from Firebase
    2) Some way of knowing if it's currently selected
    3) If it's selected, stay expanded to the square
    4) If it's selected, have the box show on the side
    */

    groupChat = () => {
        //console.log(this.props)
        this.props.goToUrl(`/chats/${this.props.getProjectDashboardState().project.key}`)
    }


    style = () => {

        if (this.state.iconIsManager) {
            return ({
                backgroundColor: this.color,
                borderColor: this.props.color,
                borderWidth: '2px',
                borderStyle: 'solid'
            })
        } else {
            return ({
                backgroundColor: this.color,
                borderColor: this.props.color,
            })

        }
   }

    onOpenLogModal = () => {
        this.setState({ openLog: true });
    };

    onCloseLogModal = () => {
        this.setState({ openLog: false });
    };

    archiveImage = () => {
        if (!this.props.showArchive){
            return (
                <img alt={"Archive"} src={archiveCheck} title={this.props.getButtonText()}  onClick={this.props.toggleShowArchive} id="projectSettingsIcon" />
            )
        } else {
            return (
                <img alt={"Archive"} src={archiveIcon} title={this.props.getButtonText()}  onClick={this.props.toggleShowArchive} id="projectSettingsIcon" />
            )
        }
    }


    render = () => {
        //let color = "#3CB4CB";
        let color = this.props.projectColor;
        let colors = ['#E74C3C', '#E67E22', '#F1C40F', '#E91E63', '#9B59B6', '#3498DB', '#2ECB71', '#18AE90']
        const { open } = this.state;
        const { filterModalOpen } = this.state;

        let settings = this.renderSettings(color, colors)


        let eventKeys
        if (this.props.events) {
            eventKeys = Object.keys(this.props.events)
        }
        const hasOnClick = this.props.onClick
        const { openLog } = this.state;


        let archiveImage = this.archiveImage()

        return (
            <div id="projectTitleContainer" style={{backgroundColor: color, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', 'flex-direction': 'row', marginLeft: '14px', marginTop: '6px', color: 'white'}}>
                    <p className="text_header">{this.props.title}</p>
                    <p style={{marginLeft: '10px', marginRight: '10px', marginTop: '-1px', fontSize: '15pt'}}>|</p>
                    <p className="text_description" style={{marginTop: '7px'}}>{this.props.getProjectDashboardState().project.projectDescription}</p>
                </div>
                <div id="projectTitleLeftContents">
                    {/*<button onClick={this.props.toggleShowArchive}>{this.props.getButtonText()}</button>*/}
                    {/*<button type="button" onClick={this.deleteProject} >Delete Project</button>*/}
                    <img alt="Chat" src={chatIcon} title="Open Chat" onClick={this.groupChat} id="projectSettingsIcon"/>


                    {archiveImage}


                   <img alt={"Filter"} src={filterIcon} title={"Filter"}  onClick={this.onOpenFiltersModal} id="projectSettingsIcon"/>
                   <Modal open={filterModalOpen} onClose={this.onCloseFiltersModal} little classNames={{overlay: 'settingsPopupOverlay', modal: 'settingsPopupModal'}}>
                        <FilterSelection project={this.props.project} getAppState={this.props.getAppState}/>
                    </Modal>


                    <img alt={"Log"} src={logIcon} title={"Open Project Log"} onClick={this.onOpenLogModal} id="projectSettingsIcon"/>
                            <Modal open={openLog} onClose={this.onCloseLogModal} little>
                                <p className="text_header" style={{marginRight: '30px'}}>System log for {this.props.title}</p>
                                {eventKeys && eventKeys.map((key) => {
                                    return (<p>{this.props.events[key].useid + this.props.events[key].event + " on " + this.props.events[key].timestamp}</p>)
                                })}
                            </Modal>


                    <img alt={"Settings"} src={settingsIcon} title={"Settings"} onClick={this.onOpenModal} id="projectSettingsIcon"/>
                    <Modal open={open} onClose={this.onCloseModal} little classNames={{overlay: 'settingsPopupOverlay', modal: 'settingsPopupModal'}}>
                          {settings}
                    </Modal>
               </div>
            </div>
        )
    }

}

export default ProjectTitleBar;
