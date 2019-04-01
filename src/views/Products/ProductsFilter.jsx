import React, { Component } from 'react';
import { Table, InputGroup, Button, Form } from 'react-bootstrap';

class ProductsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            onSubmit: props.onSubmit,
            filters: {
                name: "",
                minPrice: "",
                maxPrice: "",
                minDate: "",
                maxDate: ""
            }
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleMinPriceChange = this.handleMinPriceChange.bind(this);
        this.handleMaxPriceChange = this.handleMaxPriceChange.bind(this);
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

    handleMinPriceChange(event) {
        this.setState({
            filters: {
                ...this.state.filters,
                minPrice: event.target.value
            }
        });
    }

    handleMaxPriceChange(event) {
        this.setState({
            filters: {
                ...this.state.filters,
                maxPrice: event.target.value
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
            filters.push(product => {
                return product.name.includes(this.state.filters.name);
            });
        }
        if (this.state.filters.minPrice !== "") {
            filters.push(product => {
                return product.value >= parseInt(this.state.filters.minPrice);
            });
        }
        if (this.state.filters.maxPrice !== "") {
            filters.push(product => {
                return product.value <= parseInt(this.state.filters.maxPrice);
            });
        }
        if (this.state.filters.minDate !== "") {
            filters.push(product => {
                return product.createdDate >= Date.parse(this.state.filters.minDate);
            });
        }
        if (this.state.filters.maxDate !== "") {
            filters.push(product => {
                return product.createdDate <= Date.parse(this.state.filters.maxDate);
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
                            <td colSpan={2}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend id="value">
                                        <InputGroup.Text>Name</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control placeholder="Product Name" type="text" 
                                        value={ this.state.filters.name } onChange={ this.handleNameChange } />
                                </InputGroup>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend id="value">
                                        <InputGroup.Text>Price</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control placeholder="Minimum Value" type="number" 
                                        value={ this.state.filters.minPrice } onChange={ this.handleMinPriceChange } />
                                    <Form.Control placeholder="Maximum Value" type="number" 
                                        value={ this.state.filters.maxPrice } onChange={ this.handleMaxPriceChange } />
                                </InputGroup>
                            </td>
                            <td>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend id="value">
                                        <InputGroup.Text>Date</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control placeholder="Minimum Date" type="date" 
                                        value={ this.state.filters.minDate } onChange={ this.handleMinDateChange } />
                                    <Form.Control placeholder="Maximum Date" type="date" 
                                        value={ this.state.filters.maxDate } onChange={ this.handleMaxDateChange } />
                                </InputGroup>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={2}>
                                <Button variant="primary" type="Submit">Submit</Button>
                            </th>
                        </tr>
                    </tfoot>
                </Table>
            </Form>
        );
    }
}

export default ProductsPage;