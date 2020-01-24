import React from "react";
import './Notepad.pcss';

const Header = function(props) {
    return (
        <header>
            <div className="btnSidebar">
                <button onClick={props.onClick}>Shared Document</button>
            </div>
        </header>
    );
};

export default Header;