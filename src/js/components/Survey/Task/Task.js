import './Task.css';
import React from 'react';

import TimedSubmit from './TimedSubmit';
import TaskStore from '../../../stores/TaskStore';
import AccountStore from "../../../stores/AccountStore";

class Task extends React.Component {    

    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.userId,
            task: this.props.task
        };
        this.handleCutCopyPaste = this.handleCutCopyPaste.bind(this);
    }

    handleCutCopyPaste(e){

        e.preventDefault();
    }


    render () {
        let start = localStorage.getItem("counter-start") || 0;

        let instructions = (<div>
            The professor requires all students to demonstrate what they learn about a particular topic by conducting searches online and presenting their views on the topic.
            To prepare your term paper, you need to collect and save all the web pages, publications, and other online sources that are helpful for you to write a paper.
            <hr/>
            After you have completed the search phase, you will be asked to complete 13 exercises;
            those exercises include questions about your term paper topic and the writing of an outline for your term paper.
        </div>);

        if (AccountStore.isCollaborative()) {
            instructions = (<div>
            </div>);
        }

        return(
            <div className="Task" onCopy={this.handleCutCopyPaste}>





                <div className="Task-box instruction"  id="intro-description" >
                    <div className="Task-submit no-padding">
                            <TimedSubmit start={start} duration={this.state.task.duration}/>
                    </div>
                    <hr/>

                    <div className="Task-info no-padding">
                        Together with your partner find the answer to this puzzle, using SearchX only:
                        <hr/>
                        <div className="Task-instruction-specific">
                         <b> {TaskStore.getTopicDescription(this.state.task.topic)} </b> 
                        </div>

                        <hr/>
                        Remember: don't change your browser tab!

                    </div>
                </div>
            </div>
        )
    }
}

export default Task;