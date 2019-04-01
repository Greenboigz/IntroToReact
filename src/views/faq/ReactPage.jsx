import React, { Component } from 'react';

const HelloWorld = `import React, { Component } from "react";

class HelloWorld extends Component {

    render() {
        return <div>
            <h1>Hello world</h1>
        </div>
    }

}

export default HelloWorld;`;

class ReactPage extends Component {

    render() {
        return <div className="main">
            <h1>What is React?</h1>
            <p>
                React is a JavaScript library for building user interfaces. It is the view layer for web applications.
                <br/>
                At the heart of all React applications are components. A component is a self-contained module that renders some output. We can write interface elements like a button or an input field as a React component. Components are composable. A component might include one or more other components in its output.
                <br/>
                Broadly speaking, to write React apps we write React components that correspond to various interface elements. We then organize these components inside higher-level components which define the structure of our application.
                <br/>
                For example, take a form. A form might consist of many interface elements, like input fields, labels, or buttons. Each element inside the form can be written as a React component. We'd then write a higher-level component, the form component itself. The form component would specify the structure of the form and include each of these interface elements inside of it.
                <br/>
                Importantly, each component in a React app abides by strict data management principles. Complex, interactive user interfaces often involve complex data and application state. The surface area of React is limited and aimed at giving us the tools to be able to anticipate how our application will look with a given set of circumstances. We dig into these principles later in the course.
            </p>
            <h1>Okay, so how do we use it?</h1>
            <p>
                React is a JavaScript framework. Using the framework is as simple as including a JavaScript file in our HTML and using the React exports in our application's JavaScript.
                <br/>
                For instance, the Hello world example of a React website can be as simple as:
                <pre><code className="javascript">{HelloWorld}</code></pre>
                Although it might look a little scary, the JavaScript code is a single line that dynamically adds Hello world to the page. Note that we only needed to include a handful of JavaScript files to get everything working.
            </p>
            <h1>How does it work?</h1>
            <p>
                Unlike many of its predecessors, React operates not directly on the browser's Document Object Model (DOM) immediately, but on a virtual DOM. That is, rather than manipulating the document in a browser after changes to our data (which can be quite slow) it resolves changes on a DOM built and run entirely in memory. After the virtual DOM has been updated, React intelligently determines what changes to make to the actual browser's DOM.
                <br/>
                The React Virtual DOM exists entirely in-memory and is a representation of the web browser's DOM. Because of this, when we write a React component, we're not writing directly to the DOM, but we're writing a virtual component that React will turn into the DOM.
            </p>
            <h1>React Lifecycle</h1>
            <img src="https://cdn-images-1.medium.com/max/2600/1*bqLzlcQEU8e7yWQ3tKSaxQ.png" alt="React Lifecycle" style={{marginBottom: 10}} />
            <p>
                The above is the life of a React component, from birth (pre-mounting) and death (unmounting).
                <br/>
                The beauty of React is the splitting of complicated UI’s into little, bite-sized bits. Not only can we thus compartmentalize our app, we can also customize each compartment.
                <br/>
                Through lifecycle methods, we can then control what happens when each tiny section of your UI renders, updates, thinks about re-rendering, and then disappears entirely.
                <br/>
                We will go over the more useful lifecycle steps, but if you want to read more reference the link in the sources section at the bottom of the page.
            </p>
            <h2>componentDidMount</h2>
            <p>
                ComponentDidMount is where you do all the setup for the component that is now mounted into the VirtualDom. Here you can do some important things like:
                <ul>
                    <li>Draw on a <code>canvas</code> element that you just rendered</li>
                    <li>initialize a masonry grid layout from a collection of elements</li>
                    <li>add event listeners</li>
                </ul>
            </p>
            <h2>componentWillReceiveProps</h2>
            <p>
                ComponentWillReceiveProps is extremely important for components that need to respond to changing inputs. This will be important for state passing from the parent component, and when working with Redux.
                <br/>
                Here's what we should do when we receive new props:
                <ol>
                    <li>check which props will change</li>
                    <li>If the props will change in a way that is significant, act on it. If necessary update the state by calling <code>setState</code></li>
                </ol>
            </p>
            <h1>Conclusion</h1>
            <p>
                
            </p>
            <hr/>
            <h5>Sources</h5>
            <ul>
                <li><a href="https://www.fullstackreact.com/30-days-of-react/day-1/">Fullstack React: What is React?</a></li>
                <li><a href="https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1">Musefind: React Lifecycle Methods- how and when to use them</a></li>
            </ul>
        </div>
    }

}

export default ReactPage;