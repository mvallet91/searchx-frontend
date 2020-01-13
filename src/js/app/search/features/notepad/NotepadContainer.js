import React from 'react';
import Iframe from 'react-iframe'


import './components/Notepad.pcss'

export default class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.handleViewSidebar = this.handleViewSidebar.bind(this);
        this.state = {sidebarOpen: false};
    }

    handleViewSidebar(){
        this.setState({sidebarOpen: !this.state.sidebarOpen});
        let margin = 600 * !this.state.sidebarOpen;
        document.getElementById("root").style.marginRight = margin + "px";
    }

    render() {
        return (
            <div className="Parent">
                <Header onClick={this.handleViewSidebar} />
                <SideBar isOpen={this.state.sidebarOpen} toggleSidebar={this.handleViewSidebar}/>
                {/*<Content isOpen={this.state.sidebarOpen}/>*/}
            </div>
        );
    }
};

class Header extends React.Component {
    render() {
        return (
            <header>
                <a href="javascript:void(0)"
                   onClick={this.props.onClick}>Shared Document</a>
            </header>
        );
    }
};

class SideBar extends React.Component {
    render() {
        let sidebarClass = this.props.isOpen ? 'sidebar open' : 'sidebar';
    return (
            <div className={sidebarClass}>
                <button onClick={this.props.toggleSidebar} className="sidebar-toggle">Hide Document</button>
                <div>
                    <Iframe url="https://beta.etherpad.org/p/SearchXtesting?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false"
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
    }
};

class Content extends React.Component {
    render() {
        let contentClass = this.props.isOpen ? 'content open' : 'content';
        return (
            <div className={contentClass}>I am content fill me up!</div>
        );
    }
};

