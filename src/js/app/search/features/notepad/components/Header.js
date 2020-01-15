import React from "react";
import './Notepad.pcss';

const Header = function(props) {
    return (
        <header>
            <a href="javascript:void(0)"
               onClick={props.onClick}>Shared Document</a>
        </header>
    );
};

export default Header;