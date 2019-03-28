import React, { Component } from 'react';
import { Table, InputGroup, Button, Form } from 'react-bootstrap';

class PurchasesFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            onSubmit: props.onSubmit,
            filters: {
                name: "",
                minQuantity: "",
                maxQuantity: "",
                minCost: "",
                maxCost: "",
                minDate: "",
                maxDate: ""
            }
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleMinQuantityChange = this.handleMinQuantityChange.bind(this);
        this.handleMaxQuantityChange = this.handleMaxQuantityChange.bind(this);
        this.handleMinCostChange = this.handleMinCostChange.bind(this);
        this.handleMaxCostChange = this.handleMaxCostChange.bind(this);
        this.handleMinDateChange = this.handleMinDateChange.bind(this);
        this.handleMaxDateChange = this.handleMaxDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({
            filters: {
                ...this.state.filters,
                name: event.target.value
            }
        });
    }

    handleMinQuantityChange(event) {
        this.setState({
            filters: {
                ...this.state.filters,
                minQuantity: event.target.value.replace('.','')
            }
        });
    }

    handleMaxQuantityChange(event) {
        this.setState({
            filters: {
                ...this.state.filters,
                maxQuantity: event.target.value.replace('.','')
            }
        });
    }

    handleMinCostChange(event) {
        this.setState({
            filters: {
                ...this.state.filters,
                minCost: event.target.value
            }
        });
    }


    handleMaxCostChange(event) {
        this.setState({
            filters: {
                ...this.state.filters,
                maxCost: event.target.value
            }
        });
    }

    handleMinDateChange(event) {
        this.setState({
            filters: {
                ...this.state.filters,
                minDate: event.target.value
            }
        });
    }

    handleMaxDateChange(event) {
        this.setState({
            filters: {
                ...this.state.filters,
                maxDate: event.target.value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        var filters = [];
        if (this.state.filters.name !== "") {
            filters.push(purchase => {
                return purchase.productName.includes(this.state.filters.name);
            });
        }
        if (this.state.filters.minQuantity !== "") {
            filters.push(purchase => {
                return purchase.quantity >= parseInt(this.state.filters.minQuantity);
            });
        }
        if (this.state.filters.maxQuantity !== "") {
            filters.push(purchase => {
                return purchase.quantity <= parseInt(this.state.filters.maxQuantity);
            });
        }
        if (this.state.filters.minCost !== "") {
            filters.push(purchase => {
                return purchase.purchaseCost >= parseInt(this.state.filters.minCost);
            });
        }
        if (this.state.filters.maxCost !== "") {
            filters.push(purchase => {
                return purchase.purchaseCost <= parseInt(this.state.filters.maxCost);
            });
        }
        if (this.state.filters.minDate !== "") {
            filters.push(purchase => {
                return purchase.purchaseDate >= Date.parse(this.state.filters.minDate);
            });
        }
        if (this.state.filters.maxDate !== "") {
            filters.push(purchase => {
                return purchase.purchaseDate <= Date.parse(this.state.filters.maxDate);
            });
        }
        this.state.onSubmit(filters);
    }

    render() {
        return (
            <Form onSubmit={ this.handleSubmit }>
                <Table bordered className="filter-table">
                    <thead>
                        <tr>
                            <th colSpan={2}><h4 style={{ marginBottom: 0 }}>Filters</h4></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend id="value">
                                        <InputGroup.Text>Product Name</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control placeholder="Product Name" type="text" 
                                        value={ this.state.filters.name } onChange={ this.handleNameChange } />
                                </InputGroup>
                            </td>
                            <td>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend id="value">
                                        <InputGroup.Text>Purchase Date</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control placeholder="Minimum Date" type="date" 
                                        value={ this.state.filters.minDate } onChange={ this.handleMinDateChange } />
                                    <Form.Control placeholder="Maximum Date" type="date" 
                                        value={ this.state.filters.maxDate } onChange={ this.handleMaxDateChange } />
                                </InputGroup>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend id="value">
                                        <InputGroup.Text>Quantity</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control placeholder="Minimum Quantity" type="number" 
                                        value={ this.state.filters.minQuantity } onChange={ this.handleMinQuantityChange } />
                                    <Form.Control placeholder="Maximum Quantity" type="number" 
                                        value={ this.state.filters.maxQuantity } onChange={ this.handleMaxQuantityChange } />
                                </InputGroup>
                            </td>
                            <td>
                            <InputGroup className="mb-3">
                                    <InputGroup.Prepend id="value">
                                        <InputGroup.Text>Cost</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control placeholder="Minimum Cost" type="number" 
                                        value={ this.state.filters.minCost } onChange={ this.handleMinCostChange } />
                                    <Form.Control placeholder="Maximum Cost" type="number" 
                                        value={ this.state.filters.maxCost } onChange={ this.handleMaxCostChange } />
                                </InputGroup>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={2}>
                                <Button variant="primary" type="Submit">Submit</Button>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </Form>
        );
    }
}

export default PurchasesFilter;