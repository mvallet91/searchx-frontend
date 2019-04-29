import React from "react";
import {withRouter} from "react-router";

import TaskedSession from "../components/session/TaskedSession";
import constants from "./constants";

import AccountStore from "../../../stores/AccountStore";
import IntroStore from "../../../stores/IntroStore";
import Helpers from "../../../utils/Helpers";
import Collapsible from "react-collapsible";
import Timer from "../components/Timer";

import {log} from '../../../utils/Logger';
import {LoggerEventTypes} from '../../../utils/LoggerEventTypes';
import ReactAudioPlayer from 'react-audio-player';
import Modal from "../../common/Modal";
import Popup from 'reactjs-popup'


class Session extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            start: false
        };
        this.onFinish = this.onFinish.bind(this);
        this.handleBeforeUnload = this.handleBeforeUnload.bind(this);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.handleBeforeUnload);
        window.addEventListener('popstate', this.handleBeforeUnload);

        IntroStore.startIntro(getIntroSteps(), () => {
            const start = localStorage.getItem("timer-start") || Date.now();
            localStorage.setItem("timer-start", start);
            this.setState({
                start: start
            });
        });
    }
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
        window.removeEventListener('popstate', this.handleBeforeUnload);
    }

    handleBeforeUnload(e) {
        const dialogText = 'Leaving this page will quit the task. Are you sure?';
        e.returnValue = dialogText;
        return dialogText;
    }

    render() {
        
        const task = AccountStore.getTask();
        const timer = (
            <div style={{marginTop: '10px', textAlign: 'center'}}>
                <Timer start={this.state.start} duration={constants.taskDuration} onFinish={this.onFinish} style={{fontSize: '2em'}} showRemaining={true}/>
            </div>
        );


        const metaInfo = {
        };


        let handleTaskOpen = () => {
            log(LoggerEventTypes.TASK_OPEN, metaInfo);
        };

 

        let waited = false;
        if (this.props.location.state) {
            waited = this.props.location.state.waited;
        }



        const taskDescription = (
            
            <Popup trigger={<button className="button-task"  onClick={handleTaskOpen} >Task Description </button>} open modal >
            {close => (
            <div className="viewer"  >
          
            <div className="header">
            <div className="pull-right">
                <span className="close" onClick = { () =>  {
                
                log(LoggerEventTypes.TASK_CLOSE, metaInfo);
                close()
            }

            
            
        } ><i className="fa fa-times"/></span>
          </div>
          </div>

          <div className="content">
    
          <p> You want information about <strong><font color="#33BEFF"> air pollution and how to reduce it </font></strong>.
                Your first stop is (naturally) Wikipedia. 
                It turns out though, that there is no dedicated article on Wikipedia about <strong><font color="#33BEFF">the reduction of air pollution</font></strong>.
            </p>
            
       

            <p> To help others, you have decided to contribute to Wikipedia and write this missing article. 
                You are not doing this alone, but with one / two online collaborators. </p>
 
            <p> We have created a dedicated search system, called SearchX, that allows you and your collaborators to search the existing Wikipedia pages together for relevant articles and pieces of information. 
                Use only SearchX to find information that you need - do not switch to a different search engine like Google or Bing. </p>

            <p> It is your and your collaborators’ task to compose an article about <strong><font color="#33BEFF">the reduction of air pollution</font></strong>, and more specifically about the following aspects of it: </p>
            <strong><font color="#33BEFF">
            <li> ways you can reduce air pollution, </li> 

            <li> with which technologies you can reduce air pollution, </li> 
               
            <li> which polluters exist, </li>

            <li> and laws about the reduction of air pollution.</li>
            </font></strong>
        <p> 
            You are free to copy and paste relevant passages from the articles you found and arrange them on the workspace to your right as you see fit. You are also free to rewrite the collected information as you see fit. Both you and your collaborators will collaboratively write the article in the workpad on the right of the search screen.
        </p>
</div>
          </div>
           )}
            
          </Popup>
         );

        return (
            <div>
                {waited && <ReactAudioPlayer
                    src="../sound/notification.mp3"
                    autoPlay
                />}
                <TaskedSession timer={timer} taskDescription={taskDescription} lastSession={false} firstSession={true}/>
            </div>
        )
    }

    ////

    onFinish() {
        this.props.history.replace({
            pathname: '/collab-workspace/posttest',
            state: { waited: true }
        });
    }
}

function getIntroSteps() {
    const task = AccountStore.getTask();

    return [
            {
                element: '.Collapsible__trigger',
                intro:  "You can read the task description again here.",
                position: "left"
            },
            {
                element: '.SearchHeader',
                intro: 'We want you to use our search system, SearchX.',
                position: 'bottom-middle-aligned'
            },
            {
                element: '.SearchHeader .form',
                intro: 'Use SearchX to search for news articles as described in the task.'
            },
            {
                element: '.QueryHistory',
                intro: 'Recent queries shows your and your group\'s past search queries. In this manner you can see what the other group members are doing. Groups vary in size, so you may see many queries by others, or none at all.',
                position: 'bottom'
            },
            {
                element: '.SearchResultsContainer',
                intro: 'The search results for your queries will appear here. You can also see which results have been saved and excluded.',
                position: 'right'
            },
            {
                element: '.SearchResultsContainer',
                intro: 'Use the Save icon (flag) on the left to save a useful result. Use the Forbidden icon to not show this result anymore for this topic.',
                position: 'right'
            },
            {
                element: '.Bookmarks',
                intro: 'The documents you and your group save will appear here. You can revisit a saved result by clicking on it.',
                position: 'top'
            },
            {
                element: '.Side',
                intro: 'The recent queries and saved documents are color-coded to show which collaborator initiated the action.',
                position: 'left'
            }
    ];
}

export default withRouter(Session);