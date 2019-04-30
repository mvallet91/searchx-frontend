import React from "react";

import {log} from "../../../utils/Logger";
import {LoggerEventTypes} from "../../../utils/LoggerEventTypes";

import AccountStore from "../../../stores/AccountStore";
import SearchStore from "../../search/SearchStore";
import constants from "./constants";

import './Pilot.pcss';
import Timer from "../components/Timer";
import ReactAudioPlayer from 'react-audio-player';

const metaInfo = {
};

class TaskDescription extends React.Component {

    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
        this.handleBeforeUnload = this.handleBeforeUnload.bind(this);
    }

    handleBeforeUnload(e) {
        const dialogText = 'Leaving this page will quit the task. Are you sure?';
        e.returnValue = dialogText;
        return dialogText;
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.handleBeforeUnload);
        window.addEventListener('popstate', this.handleBeforeUnload);
        const task = AccountStore.getTaskData();
        const groupId = AccountStore.getGroupId();
        console.log(task);
        AccountStore.setSessionId(groupId+"-"+ task.topics[0].id + "-" + SearchStore.getVariant() );
        log(LoggerEventTypes.TASK_DESCRIPTION_LOAD,metaInfo);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
        window.removeEventListener('popstate', this.handleBeforeUnload);
    }

    onFinish(e) {
        log(LoggerEventTypes.TASK_DESCRIPTION_CONTINUE,metaInfo);
        this.props.history.replace({
            pathname: '/collab-workspace/session',
            state: { waited: true }
        });
    }


    render() {
        
        const task = AccountStore.getTaskData();

        let waited = false;
        if (this.props.location.state) {
            waited = this.props.location.state.waited;
        }

        return ( <div className="Wait waitBox">
           
            <ReactAudioPlayer
                    src="../sound/notification.mp3"
                    play
            />

            <h3> Please read your task description:</h3>
            
            <p> You want information about <strong> <font color="#33BEFF"> air pollution and how to reduce it </font> </strong>.
                Your first stop is (naturally) Wikipedia. 
                It turns out though, that there is no dedicated article on Wikipedia about <strong> <font color="#33BEFF"> the reduction of air pollution  </font> </strong> . </p>
            <p> To help others, you have decided to contribute to Wikipedia and write this missing article. 
                You are not doing this alone, but with one online collaborators. </p>

            <p> We have created a dedicated search system, called SearchX, that allows you and your collaborators to search the existing Wikipedia pages together for relevant articles and pieces of information. 
                Use only SearchX to find information that you need - do not switch to a different search engine like Google or Bing. </p>

            <p> In the next page you will walk through an introduction guide to our SearchX's search features.</p>
            <p> Do not reload this page, you will be redirected once the time is up! </p>
            <Timer start={new Date()} duration={constants.taskDescriptionWait} onFinish={this.onFinish} style={{fontSize: '2em'}} showRemaining={true}/> 
        </div> )
    
    } 
}

export default TaskDescription;