import React from "react";
import Form from "../components/form/Form";
import constants from "./constants";

import {log} from "../../../utils/Logger";
import {LoggerEventTypes} from "../../../utils/LoggerEventTypes";

import AccountStore from "../../../stores/AccountStore";

class PostTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finished: localStorage.getItem('posttest-finish') === 'true',
            returnCode: Math.random().toString(36).substring(2, 10)
        };

        this.onComplete = this.onComplete.bind(this);
        this.handleBeforeUnload = this.handleBeforeUnload.bind(this);
        this.handlePopstate = this.handlePopstate.bind(this);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.handleBeforeUnload);
        window.addEventListener('popstate', this.handlePopstate);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
        window.removeEventListener('popstate', this.handlePopstate);
    }

    handleBeforeUnload(e) {
        if (!this.state.finished) {
            const dialogText = 'Leaving this page will quit the task. Are you sure?';
            e.returnValue = dialogText;
            return dialogText;
        }
    }

    handlePopstate(e) {
        const dialogText = 'Leaving this page will quit the task. Please make sure you finished the post-test and copied your payment code.';
        e.returnValue = dialogText;
        return dialogText;
    }

    render() {
        const task = AccountStore.getTask();
        return <Form
            formData={formData(this.state.returnCode)}
            onComplete={this.onComplete}
            disableCopy={false}
        />
    }

    ////

    onComplete(data) {
        log(LoggerEventTypes.SURVEY_POST_TEST_RESULTS, {
            data: data,
            returnCode: this.state.returnCode
        });

        localStorage.setItem('posttest-finish', true.toString());
        this.state.finished = true;
    }
}

const formData = function(returnCode) {
    let pages = [];
    let elements = [];

    ////

    elements.push({
        type: "html",
        name: "topic",
        html: `<h2>Exit Questionnaire</h2>`
    });

    elements.push({
        type: "html",
        name: "collab-feedback-description",
        html: "<b>We would like you to answer some questions about reducing air pollution.</b>"
    });


    elements.push({
        title: 'Which of these is not one of the six major pollutants regulated by the clean air act?',
        type: "radiogroup",
        isRequired: true,
        name: "Q1",
        choices: ["a) lead", "b) carbon monoxide", "c) carbon dioxide", "d) ozone"]
    });


    elements.push({
        title: 'A catalyst ___ a chemical reaction.',
        type: "radiogroup",
        isRequired: true,
        name: "Q2",
        choices: ["a) speeds up", "b) slows down", "c) keeps constant", "d) none of the above"]
    });


    elements.push({
        title: 'Catalytic converters',
        type: "radiogroup",
        isRequired: true,
        name: "Q3",
        choices: ["a) break down nitrous oxides, carbon monoxide, and vocs.", "b) break down pollutants the entire time the car is running."
        , "c) make the car more fuel efficient." , "d) all of the above."]
    });


    elements.push({
        title: 'In a hybrid vehicle, the car is powered by',
        type: "radiogroup",
        isRequired: true,
        name: "Q4",
        choices: ["a) an internal combustion engine.", "b) a battery that is charged by energy collected during braking.", "c) electricity.", "d) a & b"]
    });


    elements.push({
        title: 'Plug-in hybrids run for a longer time on electricity than regular hybrids.',
        type: "radiogroup",
        isRequired: true,
        name: "Q5",
        choices: ["a) True", "b) False"]
    });

   
    elements.push({
        title: 'A fuel cell converts chemical energy into _______.',
        type: "radiogroup",
        isRequired: true,
        name: "Q5",
        choices: ["a) nuclear energy", "b) electrical energy", "c) solar energy", "d) hydrological energy"]
    });


    elements.push({
        title: 'Before being released from power plants, sulfur and nitric oxides',
        type: "radiogroup",
        isRequired: true,
        name: "Q6",
        choices: ["a) can be filtered out.", "b) can be neutralized with bases.", "c) can be broken down by catalysts.", "d) all of these."]
    });
    

    elements.push({
        title: 'These help to remove particles and waste gases from exhaust using liquids or neutralizing materials.',
        type: "radiogroup",
        isRequired: true,
        name: "Q7",
        choices: ["a) filters", "b) water treatment", "c) fans", "d) scrubbers"]
    });

    elements.push({
        title: 'In gasification, this rock is heated to extremely high temperature to create syngas, which is then filtered.',
        type: "radiogroup",
        isRequired: true,
        name: "Q8",
        choices: ["a) granite", "b) coal", "c) limestone", "d) halite"]
    });


    elements.push({
        title: 'The six major pollutants have decreased by more than 50% since the clean air act of 1970 was implemented.',
        type: "radiogroup",
        isRequired: true,
        name: "Q5",
        choices: ["a) True", "b) False"]
    });
    


    elements.push({
        type: "html",
        name: "topic",
        html: `<h2>Your Task Experience</h2>`
    });

    elements.push({
        type: "html",
        name: "collab-feedback-description",
        html: "<b>We would like you to describe your task experience.</b>"
    });

    elements.push({
        title: "During the task, I had a pretty good idea about what my partner was searching for.",
        name: "awareness-1",
        type: "rating",
        isRequired: true,
        minRateDescription: "Disagree",
        maxRateDescription: "Agree"
    });

    elements.push({
        title: "During the task, I had a pretty good idea about what my partner was writing.",
        name: "awareness-2",
        type: "rating",
        isRequired: true,
        minRateDescription: "Disagree",
        maxRateDescription: "Agree"
    });

    elements.push({
        title: "During the task, I was confident that my partner was looking at information I would find valuable for completing the task.",
        name: "awareness-3",
        type: "rating",
        isRequired: true,
        minRateDescription: "Disagree",
        maxRateDescription: "Agree"
    });

    elements.push({
        title: "During the task, I was confident that I was looking at information my partner would find valuable for completing the task.",
        name: "awareness-4",
        type: "rating",
        isRequired: true,
        minRateDescription: "Disagree",
        maxRateDescription: "Agree"
    });

    

    elements.push({
        title: "It was easy to share information with my partner during the task.",
        name: "effort-1",
        type: "rating",
        isRequired: true,
        minRateDescription: "Disagree",
        maxRateDescription: "Agree"
    });


    elements.push({
        title: "It was easy for my partner and I to coordinate our efforts during this task.",
        name: "effort-2",
        type: "rating",
        isRequired: true,
        minRateDescription: "Disagree",
        maxRateDescription: "Agree"
    });


    elements.push({
        title: "It was easy to communicate with my partner during this task.",
        name: "effort-3",
        type: "rating",
        isRequired: true,
        minRateDescription: "Disagree",
        maxRateDescription: "Agree"
    });


    elements.push({
        title: "It was easy for my partner and I to reach consensus during this task.",
        name: "effort-3",
        type: "rating",
        isRequired: true,
        minRateDescription: "Disagree",
        maxRateDescription: "Agree"
    });

    elements.push({
        title: "How difficult was this task?",
        name: "difficult",
        type: "rating",
        isRequired: true,
        minRateDescription: "Very easy",
        maxRateDescription: "Very difficult"
    });



    elements.push({
        title: "Overall, how satisfied are you with your solution to this task?",
        name: "task-completion",
        type: "rating",
        isRequired: true,
        minRateDescription: "Very easy",
        maxRateDescription: "Very difficult"
    });



    elements.push({
        title: "Do you have any additional comments regarding SearchX?",
        name: "additional-comment",
        type: "comment",
        inputType: "text",
        rows: 4,
        isRequired: true
    });


    

    pages.push({elements:  elements});

    ////
   
    return {
        pages: pages,
        requiredText: "",
        showProgressBar: "top",
        showQuestionNumbers: "off",
        completedHtml: "<h2>Thank you for taking part in our study.</h2> <h3>Follow this <a href=" + constants.completionURL + "> link</a> back to Prolific Academic to confirm your participation.</h3>",
    }
};

export default PostTest;