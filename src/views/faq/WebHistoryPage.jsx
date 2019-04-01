import React, { Component } from 'react';

class WebHistoryPage extends Component {

    render() {
        return <div className="main">
            <h1>A Brief History of Web Development</h1>
            <img src="https://pbs.twimg.com/media/DM1K-5MXcAEjCm8.jpg" alt="A Brief History of Web Development" />
            <p>
                Over the past few decades there have exists a variety of different web frameworks, technologies, and stacks that have become popular and widely used by websites to serve their clients data. From REST, to .NET, to Angular, Extensionjs and React, There have been a variety of different styles and flavors with which websites can receive, handle and respond to requests.
                <br/>
                One of the driving forces that has allowed web frameworks to adapt has been the power of user web clients. Originally websites were written as a variety of endpoints able to be accessed using communication tools like REST. These would simply serve static webpages that corresponded to specific endpoints a client could route to.
                <br/>
                Then some smart people put together the ability to render HTML to serve to the client. This allowed the HTML to be made for changing data sets that could be directly mapped to the HTML. This became extremely useful for working with databases. The process of rendering HTML was a very expensive one, that would require powerful computers, computations that were too expensive for most web clients. So they wrote the backends to render the HTML. These websites would allow a user to manipulate their page in creative ways, but required calls to the backend for these manipulation.
                <br/>
                Over time, web-clients got faster and more powerful, some even smarter people than before thought, "Hey! Why don't we do some computation on the clients' computers and save our servers some energy". And so they wrote frameworks that would allow users to manipulate some information on the frontend. These frameworks leveraged Javascript in the frontend for manipulating the view and only went back to the backend for access more data.
                <br/>
                Then even more recently, web-clients got so fast, have so much memory and power, and can leverage WebSockets to receive small packets of information on the fly. This prompted the geniuses of the world thought, "Let's just send them more data at the beginning, and update the data as needed". And thus we've come to today. 
                <br/>
                If you don't believe me, log onto your computer and see how long Facebook takes to load at first. And then interact with it and see how blazing fast it is. Think to yourself, "Wow I'm so happy web technologies have come all this way."
                <br/>
                Next we are going to go over my favorite technologies for client side HTML rendering (React.js) and client side data storage (Redux.js).
            </p>
        </div>
    }

}

export default WebHistoryPage;