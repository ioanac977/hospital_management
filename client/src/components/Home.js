import React, {Component} from 'react';
import Redirect from "react-router-dom/es/Redirect";

class Home extends Component {

    render() {
        let authUser = this.props.authUser;
        if (authUser != null) {
            return <div style={{display:"flex","justify-content":"center"}}>
                <img src="https://cdn.dribbble.com/users/112162/screenshots/1130822/lifeline.gif"/>
            </div>
        }
        return (<Redirect to={'/login'}/>)
    }
}

export default Home;