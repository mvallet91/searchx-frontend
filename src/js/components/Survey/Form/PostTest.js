import './Form.css'

import React from 'react';
import Alert from 'react-s-alert';
import * as Survey from 'survey-react';

import TaskStore from '../../../stores/TaskStore';
import AccountStore from '../../../stores/AccountStore';

import {log} from '../../../utils/Logger';
import {LoggerEventTypes} from '../../../utils/LoggerEventTypes';
import config from '../../../config';

export default class PostTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isComplete: localStorage.getItem('finish') === 'true',
            isCorrect: localStorage.getItem('correct') === 'true'
        };

        this.handleComplete = this.handleComplete.bind(this);
        this.handleCutCopyPaste = this.handleCutCopyPaste.bind(this);
        this.findCorrect = this.findCorrect.bind(this);
    }

    ////

    componentWillMount() {
        Survey.Survey.cssType = "bootstrap";
        Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
    }

    componentDidMount() {
        if (!this.state.isComplete) {
            document.addEventListener('visibilitychange', this.handleVisibilityChange);
        }
    }

    componentDidUpdate() {
        if (this.state.isComplete) {
            document.addEventListener('visibilitychange', function(){
                log(LoggerEventTypes.WINDOW_CHANGE_VISIBILITY, {
                    step : "posttest",
                    hidden: document.hidden
                });
            })
        }
    }

    findCorrect(results){
        results.answer = results.answer.replace(/^\s+|\s+$/g, "")
        
        for (var answer in AccountStore.getTask().topic.answer) {
            if (results.answer == AccountStore.getTask().topic.answer[answer]) {
                localStorage.setItem('correct', true);
                return true;
            }
        }

        localStorage.setItem('correct', false);

        return false;
    }


    handleComplete(result){
        log(LoggerEventTypes.SURVEY_POST_TEST_RESULTS, {
            results: result.data
        });

        var isCorrect = this.findCorrect(result.data);

        AccountStore.clearTask();
        localStorage.setItem('finish', true);

        this.setState({
            isComplete: true,
            isCorrect: isCorrect
        });
    }

    handleCutCopyPaste(e){
        Alert.warning('You cannot copy and paste in this step.', {
            position: 'top-right',
            effect: 'scale',
            beep: true,
            timeout: "none",
            offset: 100
        });

        e.preventDefault();
    }

    handleVisibilityChange(){
        log(LoggerEventTypes.WINDOW_CHANGE_VISIBILITY, {
            step : "posttest",
            hidden: document.hidden
        });

        ////

        if (document.hidden) {
            let switchTabs = 0;
            const finish = localStorage.getItem("finish");

            if (finish === null){
                if (localStorage.getItem("switch-tabs-posttest") !== null) {
                    switchTabs = localStorage.getItem("switch-tabs-posttest");
                }

                switchTabs++;
                localStorage.setItem("switch-tabs-posttest", switchTabs);

                let times = '';
                if (switchTabs === 1) {
                    times = 'once.';
                } else if (switchTabs === 2) {
                    times = 'twice.';
                } else {
                    times = switchTabs + " times."
                }

                Alert.error('We have noticed that you have tried to change to a different window/tab.', {
                    position: 'top-right',
                    effect: 'scale',
                    beep: true,
                    timeout: "none",
                    offset: 100
                });

                Alert.error('Please, focus on completing the final test.', {
                    position: 'top-right',
                    effect: 'scale',
                    beep: true,
                    timeout: "none",
                    offset: 100
                });

                Alert.error('Remember that more than three tab changes result in non-payment. So far you have changed tabs ' + times, {
                    position: 'top-right',
                    effect: 'scale',
                    beep: true,
                    timeout: "none",
                    offset: 100
                });
            }

            if (switchTabs >= 2) {
                window.location.reload();
            }
        }
    }


    render() {


        if (this.state.isComplete) {
            document.removeEventListener("visibilitychange", this.handleVisibilityChange);
            if (this.state.isCorrect == false) {
                return (
                    <div className="Survey">
                        <div className="Survey-form">
                            <div className='Survey-complete' onCopy={this.handleCutCopyPasteDismute}>
                                <h2>Thanks for your participation!</h2>
                                <h3>You did not insert the correct answer, we will not give you the return code.</h3>
                            </div>
                        </div>
                    </div>
                );
            }
            return (
                <div className="Survey">
                    <div className="Survey-form">
                        <div className='Survey-complete' onCopy={this.handleCutCopyPasteDismute}>
                            <h2>Thanks for your participation!</h2>
                            <h3>Please, copy and paste this code on CrowdFlower: {TaskStore.getFinishCode(AccountStore.getId())}  .</h3>
                        </div>
                    </div>
                </div>
            );
        }

        ////

        var switchTabs = localStorage.getItem("switch-tabs-posttest") || 0;
        if (switchTabs >= 2) {
            return (
                <div className="Survey">
                    <div className="Survey-form">
                        <div className='Survey-complete'>
                            <h2>We are sorry!</h2>
                            <h3>You have changed to a different tab/windows more than twice, we have cancelled your participation.</h3>
                        </div>
                    </div>
                </div>
            );
        }

        switchTabs = localStorage.getItem("switch-tabs-search") || 0;

        if (switchTabs >= 2) {
            return (
                <div className="Survey">
                    <div className="Survey-form">
                        <div className='Survey-complete'>
                            <h2>We are sorry!</h2>
                            <h3>You have changed to a different tab/windows during searching, we have cancelled your participation.</h3>
                        </div>
                    </div>
                </div>
            );
        }


        ////

        if (AccountStore.getTaskTopic() === '') {
            return <div/>;
        }

        ////

        const data = TaskStore.getPostTest();
        const survey = new Survey.Model(data);

        survey.requiredText = "";
        survey.onComplete.add(this.handleComplete);

        return (
            <div className="Survey">
                <div className="Survey-form" onPaste={this.handleCutCopyPaste} onCut={this.handleCutCopyPaste} onCopy={this.handleCutCopyPaste}>
                    <Survey.Survey model={survey} onValidateQuestion={TaskStore.surveyValidateWordCount}/>
                </div>
            </div>
        );
    }
}
