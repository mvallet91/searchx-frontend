import './Notepad.pcss';
import React from 'react';
import Iframe from "react-iframe";


const Notepad = function(props) {
    const sidebarClass = props.isOpen ? 'sidebar open' : 'sidebar';
    const padUrl = "https://beta.etherpad.org/p/" + props.padUrl + "?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false";
    return (
        <div className={sidebarClass}>
            <button onClick={props.toggleSidebar} className="sidebar-toggle">Hide Document</button>
            <div>
                <Iframe url={padUrl}
                        width="600px"
                        height={window.innerHeight - 50}
                        id="embed_readwrite"
                        className="etherpadDoc"
                        display="initial"
                        position="relative"
                        overflow="auto"/>
            </div>
        </div>
    );
};

export default Notepad;


