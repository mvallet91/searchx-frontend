import React from "react";
import './Notepad.pcss';

const Header = function() {
    return (
        <header>
            <a href="javascript:;" onClick={this.props.onClick}>Click Me!</a>
        </header>
    );
};

// let Header = React.createClass({
//     render: function() {
//         return (
//             <header>
//                 <a href="javascript:;" onClick={this.props.onClick}>Click Me!</a>
//             </header>
//         );
//     }
// });

export default Header;