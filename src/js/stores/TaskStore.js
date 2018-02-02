import request from 'superagent';
import EventEmitter from 'events';
import AccountStore from "./AccountStore";

import codes from '../../../dist/data/codes.json';

const env = require('env');


const TaskStore = Object.assign(EventEmitter.prototype, {
    initializeTask(callback) {
        let url = '/pretest';

        request
            .get(env.serverUrl + '/v1/users/' + AccountStore.getId() + '/task/?collaborative=' + AccountStore.isCollaborative())
            .end((err, res) => {
                if(err) {
                    callback('/register');
                }

                if(res) {
                    const data = res.body;
                }

                callback(url);
            })
    },

    ////

    getTopicDescription(topic) {
        return topic.task;
    },

    getTopicVideo(topic) {
        const prefix = "https://www.youtube.com/watch?v=";
        return prefix + topic.youtube;
    },

    ////

    isOverSwitchTabsLimit() {
        const switchTabsPreTest = localStorage.getItem("switch-tabs-posttest");
        const switchTabsPostTest = localStorage.getItem("switch-tabs-posttest");
        const switchTabsVideo = localStorage.getItem("switch-tabs-video");

        return switchTabsPreTest >= 3 || switchTabsPostTest >= 3 || switchTabsVideo >= 3;
    },

    ////

    getUserIdFromResults(results) {
        return results["userId"].replace(/\s/g, '');
    },

    getScoresFromResults(results) {
        let scores = {};
        Object.keys(results).forEach((result) => {
            const v = result.split("-");
            if (v[0] === "Q") {
                if(!scores[v[1]]) scores[v[1]] = 0;
                scores[v[1]] += parseInt(results[result]);
            }
        });

        return this.formatScores(scores);
    },

    formatScores(scores) {
        return Object.keys(scores)
            .filter((key) => key !== '0')
            .map(key => {
                return {
                    topicId: key,
                    score: scores[key]
                };
            })
            .sort((a,b) => a.score - b.score);
    },

    ////

    getRegisterInfo() {
        return registerInfoPage();
    },

    getPreTest() {
        return preTestPage();
    },

    getPostTest() {
        return postTestPage(AccountStore.getTaskTopic());
    },

    surveyValidateQuestion (s, options) {
        if (options.name === 'userId') {
            const userId = options.value;
            
            if(!codes[userId.replace(/^\s+|\s+$/g, "")]) {
                options.error = "This User Code is not valid, please check if you have copied and pasted the code correctly.";
            }
        }
    }, 


    getFinishCode(userCode){
        return codes[userCode.replace(/^\s+|\s+$/g, "")];
    },

    surveyValidateWordCount (s, options) {
        if (options.name === 'describe') {
            const text = options.value;
            const c = text.split(" ").length;

            if (c < 50) {
                options.error = "You have written only " + c + " words, you need to write at least 50 words to complete the exercises.";
            }
        }
    }
});


////

const registerInfoPage = function() {
    let pages = [];
    let elements = [];

    elements.push({
        type: "html",
        name: "topic",
        html: "<h2>Registration</h2>" +
        "<h3>First fill out this basic information about you.</h3>"
    });

    elements.push({
        type: "html",
        html: "<hr/>"
    });

    elements.push({
            title: "Insert your code here",
            name : "userId",
            type :"text",
            inputType:"text",
            width: 300,
            isRequired: true
        }
    );

    elements.push({
        type: "html",
        html: "<hr/>"
    });

    elements.push({
        title: "What is your highest academic degree so far?",
        name: "degree",
        type: "radiogroup",
        isRequired: true,
        choices: [
            {value: 0, text: "High School"},
            {value: 1, text: "Bachelor"},
            {value: 2, text: "Master"},
            {value: 3, text: "Doctorate"}
        ]
    });

    elements.push({
        title: "Which subject areas you have university degree(s)?",
        visibleIf: "{degree} > 0",
        name : "background",
        type :"text",
        inputType:"text",
        width: 500,
        isRequired: true
    });

    elements.push({
        type: "html",
        html: "<hr/>"
    });

    elements.push({
        title: "Are you an English native speaker?",
        name: "english",
        type: "radiogroup",
        isRequired: true,
        choices: [
            {value: 0, text: "No"},
            {value: 1, text: "Yes"},
        ]
    });

    elements.push({
        title: "What is your level of English?",
        visibleIf: "{english} == 0",
        name : "english-level",
        type: "radiogroup",
        isRequired: true,
        choices: [
            {value: 0, text: "Beginner"},
            {value: 1, text: "Elementary"},
            {value: 2, text: "Intermediate"},
            {value: 3, text: "Upper-intermediate"},
            {value: 4, text: "Advanced"},
            {value: 5, text: "Proficiency"}
        ]
    });

    elements.push({
        type: "html",
        html: "<hr/>"
    });


    pages.push({elements:  elements});
    return {
        pages: pages,
        showQuestionNumbers: "off",
        completedHtml: "    "
    }
};

const preTestPage = function() {
    let pages = [];
    let elements = [];

    if (AccountStore.isCollaborative()) {
        elements = [];

        elements.push({
            type: "html",
                html: `
<b> Collaborative search is when participants work together to complete a search task. </b>

<br/>

Collaborating with other people can take many forms, a few examples are shown here: 
two people searching together on a single machine, 
several people searching towards a common goal on separate machines either in the same location or in different locations.

<br/><br/>

<div align="center">
    <div style="height: 220px; width: 220px; display: inline-block; background-image: url('img/collab_1.jpg'); background-size: cover; background-position: center center;"></div>
    <div style="height: 220px; width: 220px; display: inline-block; background-image: url('img/collab_2.jpg'); background-size: cover; background-position: center center;"></div>
    <div style="height: 220px; width: 220px; display: inline-block; background-image: url('img/collab_3.jpg'); background-size: cover; background-position: center center;"></div>
</div>
                `
        });

        elements.push({
            title: "Have you ever collaborated with other people to search the Web?",
            name: "collab-previous",
            type: "radiogroup",
            isRequired: true,
            choices: [
                {value: 0, text: "No"},
                {value: 1, text: "Yes"},
            ]
        });

        elements.push({
            title: "How often do you engage in collaborative Web search?",
            visibleIf: "{collab-previous} == 1",
            name: "collab-frequency",
            type: "radiogroup",
            isRequired: true,
            choices: [
                {value: 0, text: "Daily"},
                {value: 1, text: "Weekly"},
                {value: 2, text: "Monthly"},
                {value: 3, text: "Less often"},
            ]
        });

        elements.push({
            type: "html",
            html: "<hr/>"
        });

        elements.push({
            type: "html",
            html: "<b> Think about the most recent time you collaborated with others to search the web. </b>"
        });

        elements.push({
            title: "Describe the nature of the information need that prompted this collaborative search episode. " +
            "(e.g. husband and wife planning a trip for the family, a group of students working on a writing assignment and sharing search results/findings, a couple shopping for a new sofa, etc.)",
            name: "collab-information-need",
            type: "comment",
            inputType: "text",
            width: 600,
            rows: 4,
            isRequired: true
        });

        elements.push({
            title: "Which tools did you use to communicate with your collaborators" +
            "(e.g. email, chat, Skype, Whatsapp, talking on the phone, etc)?",
            name: "collab-tools",
            type: "comment",
            inputType: "text",
            width: 600,
            rows: 4,
            isRequired: true
        });

        elements.push({
            title: "With how many others did you collaborate with (i.e. not counting yourself)?",
            name: "collab-members",
            type: "text",
            width: 600,
            inputType: "number",
            isRequired: true
        });

        elements.push({
            type: "html",
            html: "<hr/>"
        });

        elements.push({
            title: "How satisfied were you with the quality of the answer(s)?",
            name: "collab-answer-satisfaction",
            type: "rating",
            minRateDescription: "Not Satisfied",
            maxRateDescription: "Completely satisfied"
        });

        elements.push({
            title: "How satisfied were you with the ease of working collaboratively?",
            name: "collab-ease-satisfaction",
            type: "rating",
            minRateDescription: "Not Satisfied",
            maxRateDescription: "Completely satisfied"
        });

        pages.push({elements:  elements});
    }

    ////

    return {
        pages: pages,
        showProgressBar: "top",
        showQuestionNumbers: "off",
        completedHtml: "<p> </p>  "
    }
};

const postTestPage = function(topic) {
    let pages = [];
    let elements = [];

    ////

    elements.push({
        type: "html",
        name: "topic",
        html: "<h2>Post Questionnaire</h2>"
    });


    ////

    elements = [];


    elements.push({
        title: "Write your answer to the puzzle:",
        name: "answer",
        type: "text",
        inputType: "text",
        description: "",
        width: 230,
        rows: 1,
        isRequired: true
    });

    elements.push({
        title: "Please write what you and your partner did to find the answer. Use at least 50 words.",
        name: "describe",
        type: "comment",
        inputType: "text",
        width: 600,
        rows: 6,
        isRequired: true
    });

    elements.push({
        type: "html",
        html: "<hr/>"
    });

    if (AccountStore.getTaskType() === "search") {
        elements.push({
            title: "During your searches did you have difficulties finding information about something? If so, describe briefly what you were looking for.",
            name: "difficulties",
            type: "comment",
            inputType: "text",
            width: 600,
            rows: 4,
            isRequired: true
        });
    }

    elements.push({
        title: "Do you have any additional comments?",
        name: "additional-comment",
        type: "comment",
        inputType: "text",
        width: 600,
        rows: 4,
        isRequired: true
    });

    pages.push({elements:  elements});

    ////

    if (AccountStore.isCollaborative()) {
        elements = [];

        elements.push({
            type: "html",
            name: "collab-feedback-description",
            html: "<b> We would also like you to describe your experience in collaborating with your partner. </b>"
        });

        elements.push({
            title: "Did you find the collaborative features useful?",
            name: "collab-rating",
            type: "matrix",
            isRequired: true,
            isAllRowRequired: true,

            columns: [
                {
                    value: 1,
                    text: "Strongly Disagree"
                }, {
                    value: 2,
                    text: "Disagree"
                }, {
                    value: 3,
                    text: "Neutral"
                }, {
                    value: 4,
                    text: "Agree"
                }, {
                    value: 5,
                    text: "Strongly Agree"
                }
            ],
            rows: [
                {
                    value: "query-history",
                    text: "Shared Query History"
                }, {
                    value: "bookmarks",
                    text: "Shared Bookmarks"
                }, {
                    value: "chat",
                    text: "Group Chat"
                }
            ]
        });

        elements.push({
            title: "How did you make use of the collaborative features and the information from your partner to help in doing your task?",
            name: "collab-usage",
            type: "comment",
            inputType: "text",
            width: 600,
            rows: 4,
            isRequired: true
        });

        elements.push({
            title: "Do you have any additional comments regarding collaborating with your partner?",
            name: "collab-comments",
            type: "comment",
            inputType: "text",
            width: 600,
            rows: 4,
            isRequired: true
        });

        pages.push({elements:  elements});
    }

    ////

    return {
        pages: pages,
        showProgressBar: "top",
        showQuestionNumbers: "off",
        completedHtml: "<p> </p>"
    }
};

export default TaskStore;