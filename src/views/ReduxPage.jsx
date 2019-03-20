import React, { Component } from 'react';

const ReactExample = `class App extends React.Component {
    constructor(props) {
        super(props);
        // First the Parent creates a state for what will be passed
        this.state = { userStatus: "NOT LOGGED IN"}
        this.setStatus = this.setStatus.bind(this);
    }
    // A method is provided for the child component to update the state of the
    // userStatus
    setStatus(username, password) {
        const newUsers = users;
        newUsers.map(user => {
            if (user.username == username && user.password === password) {
                this.setState({
                    userStatus: "LOGGED IN"
                })
            }
        });
    }
   
    render() {
        return (
            <div>
                // the state is passed to the sibling as a props as is updated whenever
                // the child component changes the input
                <Status status={this.state.userStatus} />
                // this method is passed to the child component as a props which it
                // uses to change the state of the userStatus
                <Login handleSubmit={this.setStatus} />
            </div>
        );
    }
});`;

const ActionCreatorExample = `const setLoginStatus = (name, password) => {
    return {
        type: "LOGIN",
        payload: {
            username: "foo",
            password: "bar"
        }
    }
}`;

const ReducerExample = `const LoginComponent = (state = initialState, action) => {
    switch (action.type) {
    
    // This reducer handles any action with type "LOGIN"
    case "LOGIN":
        return state.map(user => {
            if (user.username !== action.username) {
                return user;
            }
    
            if (user.password == action.password) {
                return {
                    ...user,
                    login_status: "LOGGED IN"
                }
            }
        });
    default:
        return state;
    } 
};`;

const StoreExample = `class App extends React.Component {
    render() {
        return (
            <div>
                <Status user={this.props.user.name}/>
                <Login login={this.props.setLoginStatus}/>
            </div>
        )
    }
}`;

class ReduxPage extends Component {

    render() {
        return (
            <div className="main">
                <h1>What is Redux?</h1>
                <p>
                    Redux is a predictable state container for JavaScript applications. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.
                    <br />
                    Simply put, Redux is a state management tool. While it’s mostly used with React, it can be used with any other JavaScript framework or library. It is lightweight at 2KB (including dependencies), so you don’t have to worry about it making your application’s asset size bigger.
                    <br />
                    With Redux, the state of your application is kept in a store and each component can access any state that it needs from this store. Let’s dive a little deeper to see why you might need a state management tool.
                </p>
                <h1>Why you need a state management tool</h1>
                <p>
                    At the beginning of this article, we made it clear that Redux is a state management tool but now, let’s consider why you might need a state management tool.
                    <br />
                    Most libraries like React, Angular, etc. are built with a way for components to internally manage their state without any need for an external library or tool. It does well for applications with few components but as the application grows bigger, managing states shared across components becomes a chore.
                    <br />
                    In an app where data is shared among components, it might be confusing to actually know where a state should live. Ideally, the data in a component should live in just one component. So sharing data among sibling components becomes difficult.
                    <br />
                    For instance, in React, to share data among siblings, a state has to live in the parent component. A method for updating this state is provided by this parent component and passed as props to these sibling components.
                    <br />
                    Here’s a simple example of a login component in React. The input of the login component affects what is displayed by its sibling component, the status component:
                </p>
                <pre><code className="javascript">{ReactExample}</code></pre>
                <p>
                    Now imagine what happens when a state has to be shared between components that are far apart in the component tree. The state has to be passed from one component to another until it gets to where it is needed.
                    <br />
                    Basically, the state will have to be lifted up to the nearest parent component and to the next until it gets to an ancestor that is common to both components that need the state and then it is passed down. This makes the state difficult to maintain and less predictable. It also means passing data to components that do not need such data.
                    <br />
                    It’s clear that state management gets messy as the app gets complex. This is why you need a state management tool like Redux that makes it easier to maintain these states. Let’s get a good overview of Redux concepts before considering its benefits.
                    <br />
                    Below you can see an visual representation of how Redux simplifies state management for your applications:
                </p>
                <img src="https://css-tricks.com/wp-content/uploads/2016/03/redux-article-3-03.svg" alt="Redux State Management" />
                <h1>Understanding how Redux works</h1>
                <p>
                    The way Redux works is simple. There is a central store that holds the entire state of the application. Each component can access the stored state without having to send down props from one component to another.
                    <br />
                    There are three building parts: <b>actions</b>, <b>store</b> and <b>reducers</b>. Let’s briefly discuss what each of them does. This is important as they help you understand the benefits of Redux and how it’s to be used. We’ll be implementing a similar example to the login component above but this time in Redux.
                </p>
                <img src="https://1.bp.blogspot.com/-CSB8FCTH4Wk/WnVvlcfrhkI/AAAAAAAAADs/iATd4itZFYkRX0ciAH2qsJj_rNndxuwBwCPcBGAYYCw/s1600/redux-lifecycle.jpg" alt="Redux Life Cycle" />
                <h2>Actions in Redux</h2>
                <p>
                    Simply put, <b>actions</b> are events. They are the only way you can send data from your application to your Redux store. The data can be from user interactions, API calls or even form submission.
                    <br />
                    Actions are sent using store.dispatch() method. Actions are plain JavaScript objects and they must have a type property to indicate the type of action to be carried out. They must also have a payload that contains the information that should be worked on by the action. Actions are created via an action creator.
                    <br />
                    Here’s an example of an action creator that can be carried out during login in an app:
                </p>
                <pre><code className="javascript">{ActionCreatorExample}</code></pre>
                <p>
                    As explained earlier, the action must contain the type property and then the other payload to be stored.
                </p>
                <h2>Reducers in Redux</h2>
                <p>
                    Reducers are pure functions that take the current state of an application, perform an action and returns a new state. These states are stored as objects and they specify how the state of an application changes in response to an action sent to the store.
                    <br />
                    It is based on the reduce function in JavaScript where a single value is gotten from multiple values after a callback function has carried out.
                    <br />
                    Here is an example of how <b>reducers</b> work in Redux:
                </p>
                <pre><code className="javascript">{ReducerExample}</code></pre>
                <p>
                    As pure functions, they do not change the data in the object passed to it or perform any side effect in the application. Given the same object, it should always produce the same result.
                </p>
                <h2>Store in Redux</h2>
                <p>
                    The store holds the application state. There is only one store in any Redux application. You can access the state stored, update the state, and register or unregister listeners via helper methods.
                    <br />
                    Let’s create a store for our login app:
                </p>
                <pre><code className="javascript">const store = createStore(LoginComponent);</code></pre>
                <p>
                    Actions performed on the state always returns a new state. Thus, the state is very easy and predictable.
                    <br />
                    Now that we know a little more about Redux, let’s go back to our Login component example that was implemented earlier on and see how Redux can improve the component.
                </p>
                <pre><code className="javascript">{StoreExample}</code></pre>
                <p>
                    With Redux there’s one general state in the store and each component has access to the state. This eliminates the need to continuously pass state from one component to another.
                    <br/>
                    When using Redux with React, states will no longer need to be lifted up, hence it makes it easier for you to trace which action causes any change. As seen above, the component does not need to provide any state or method for its children components to share data among themselves. Everything is handled by Redux. This greatly simplifies the app and makes it easier to maintain.
                    <br/>
                    While this is the primary benefit and reason why you should use Redux, here’s a summary of other reasons why you should use Redux:
                </p>
                <h1>Other benefits of using Redux</h1>
                <ol class="postList">
                    <li>
                        <b>Redux makes the state predictable.</b> In Redux, the state is always predictable. If the same state and action are passed to a reducer, the same result is always produced as reducers are pure functions. The state is also immutable and is never changed. This makes it possible to implement arduous tasks like infinite undo and redo. It is also possible to implement time travel that is, the ability to move back and forth among the previous states and view the results in real-time.
                    </li>
                    <li>
                        <b>Maintainability.</b> Redux is strict about how code should be organized so it makes it easier for someone with knowledge of Redux to understand the structure of any Redux application. This generally makes it easier to maintain.
                    </li>
                    <li>
                        <b>Debuggable for days.</b> Redux makes it easy to debug an application. By logging actions and state, it is easy to understand coding errors, network errors and other forms of bugs that might come up during production.
                    </li>
                    <li>
                        <b>Ease of testing.</b> It is easy to test Redux apps as functions used to change the state of pure functions.
                    </li>
                    <li>
                        You can persist some of the app’s state to local storage and restore it after a refresh. This can be really nifty.
                    </li>
                    <li>
                        Redux can also be used for server-side rendering. With it, you can handle the initial render of the app by sending the state of an app to the server along with its response to the server request. The required components are then rendered in HTML and sent to the clients.
                    </li>
                </ol>
                <h1>Conclusion</h1>
                <p>
                    We have discussed major features of Redux and why Redux is beneficial to your app. While Redux has its benefits, it that does not mean you should go about adding Redux in all of your apps. Your application might still work well without Redux.
                    <br/>
                    One major benefit of Redux is to add direction to decouple "what happened" from "how things change". However, you should only implement Redux if you determine your project needs a state management tool.
                </p>
                <hr/>
                <h5>Source</h5>
                <ul>
                    <li><a href="https://blog.logrocket.com/why-use-redux-reasons-with-clear-examples-d21bffd5835">LogRocket - Why use Redux? Reasons with clear examples</a></li>
                </ul>
            </div>
        )
    }

}

export default ReduxPage;