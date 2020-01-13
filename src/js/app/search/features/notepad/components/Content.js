import React from "react";
import './Notepad.pcss';


const Content = function() {
    const contentClass = this.props.isOpen ? 'content open' : 'content';
    return (
        <div className={contentClass}>I am content fill me up!</div>
    );
};

// let Content = React.createClass({
//     render: function() {
//         var contentClass = this.props.isOpen ? 'content open' : 'content';
//         return (
//             <div className={contentClass}>I am content fill me up!</div>
//         );
//     }
// });

export default Content;