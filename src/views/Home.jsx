import React, { Component } from 'react';

class Home extends Component {

    render() {
        return <div className="main">
            <h1>Welcome</h1>
            <p>
                Prepare yourselves for a journey, the likes of which you could never have imagined.
                <br/>
                Currently you are looking at an application written entirely in React and Redux... I know pretty scary stuff.
                <br/>
                Well fear not! We will be breaking down this entire application in how it behaves and functions together. Hopefully by the end of it, I can convince you that React, Redux, and the related technologies are the future of Nodal Exchanges UI!
            </p>
            <div className="image">
                <h5>Join me on this journey...</h5>
                <img src="https://jooinn.com/images/journey-97.jpg" alt="Join me on this journey" />
            </div>
        </div>
    }

}

export default Home;