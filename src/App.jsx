import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import logo from './logo.svg';
import { LoadProductsDispatcher } from './actions/loadStoreActions';
import Home from './views/Home';
import WebHistoryPage from './views/WebHistoryPage';
import ProductsPage from './views/Products/ProductsPage';
import TradesPage from './views/TradesPage';
import ReactPage from './views/ReactPage';
import ReduxPage from './views/ReduxPage';

import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: props.products
        }
    }

    componentWillMount() {
        this.props.initProducts();
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps");
        this.setState({
            products: nextProps.products
        });
    }

    render() {
        return (
            <div>
                <Router>
                    <Navbar bg="dark" variant="dark" className="sticky">
                        <Navbar.Brand>
                            <img src={logo} className="App-logo" alt="logo" />
                            Welcome to React
                        </Navbar.Brand>
                        <Nav>
                            <Link className="nav-link" to="/">Home</Link>
                            <NavDropdown title="FAQ" id="basic-nav-dropdown">
                                <Link className="dropdown-item" to="/faq/history">Web History</Link>
                                <Link className="dropdown-item" to="/faq/react">React</Link>
                                <Link className="dropdown-item" to="/faq/redux">Redux</Link>
                            </NavDropdown>
                            <NavDropdown title="Demo" id="basic-nav-dropdown">
                                <Link className="dropdown-item" to="/products">Products</Link>
                                <Link className="dropdown-item" to="/trades">Trades</Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/faq/history" component={WebHistoryPage} />
                        <Route exact path="/faq/react" component={ReactPage} />
                        <Route exact path="/faq/redux" component={ReduxPage} />
                        <Route path="/products" component={ProductsPage} />
                        <Route path="/trade" component={TradesPage} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        initProducts: () => LoadProductsDispatcher(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);