import './Survey.css'
import React from 'react';
import {Link} from 'react-router-dom';

import TaskStore from "../../stores/TaskStore";
import config from "../../config";
import AccountStore from "../../stores/AccountStore";

const NUM_EXERCISES = 13;
const WAITING_TIME = config.groupTimeout;
const TASK_DURATION = config.taskDuration;

////

class Welcome extends React.Component {
    render() {
        if (TaskStore.isOverSwitchTabsLimit()) {
            return (
                <div/>
            );
        }

        return (
            <div className="Welcome">
                <div className="row">
                    <div className="col-md-12"> 
                        <div className="Info" >
                            <h3>Requirements:</h3>
                            <ol type="1">
                                <li>
                                    <a href="https://www.whatismybrowser.com/" target="_blank">Check here</a> if the version of your browser meets our requirements:
                                    Google Chrome version 47 (or higher) and Mozilla Firefox version 44 (or higher).
                                </li>
                            </ol>



                            <hr/>
                            <h3>
                                In this task you are required to follow these instructions:
                            </h3>
                            <ol type="1">
                                <li><b>Questionnaire: we ask you a few questions about how you generally search the Web.</b> </li>
                                  
                                <li><b>Solve a search puzzle using our SearchX system in collaboration with another worker.</b>
                                </li>
                                <li><b>Questionnaire again: we ask you a few questions about the answer to the puzzle.</b>
  
                                </li>
                           
                            </ol>

                            <hr/>
                            <h3>IMPORTANT!</h3>
                            <h4>We will pay if:</h4>
                            <ul>
                                <li> you and your partner found the correct answer to the puzzle</li>
                                <li> you used only our search system</li>
                                <li> you have not changed tabs/windows</li>
                            </ul>

                            <hr/>
                            <h3> Good Luck and Have Fun! </h3>
                            <Link to="/register" className="btn btn-primary btn-lg pull-right" role="button">Start!</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Welcome;