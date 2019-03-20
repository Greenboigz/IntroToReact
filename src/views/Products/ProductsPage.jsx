import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import dateformat from 'dateformat';

class ProductsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: {
                loading: false,
                list: [],
                error: false
            },
            query: {
                sort: {
                    column: "value",
                    direction: "ASC"
                },
                filters: [],
                page: {
                    currentPage: 1,
                    pageSize: 20
                }
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            products: nextProps.products
        });
    }

    getProductListFilteredSortedAndPaginated() {
        if (this.state.products && this.state.products.list) {
            var products_list = this.state.products.list;
            if (this.state.query.filters.length > 0) {
                products_list = products_list.filter(product => {
                    var include = true;
                    for (var filter in this.state.query.filters) {
                        include &= filter.values.indexOf(product[filter.key]) != -1;
                    }
                    return true;
                });
            }
            if (this.state.query.sort.id != "") {
                products_list.sort((p1, p2) => {
                    return (this.state.query.sort.direction == "ASC") ? p1[this.state.query.sort.column] - p2[this.state.query.sort.column] : p2[this.state.query.sort.column] - p1[this.state.query.sort.column];
                })
            }
            if (products_list.length > this.state.query.page.pageSize) {
                products_list = products_list.filter((product, index) => {
                    return Math.floor(index / this.state.query.page.pageSize) == this.state.query.page.currentPage - 1;
                })
            }
            return products_list;
        } else {
            return [];
        }
    }

    getProductsTable() {
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Current Value</th>
                        <th>Created Date</th>
                    </tr>
                </thead>
                <tbody>
                    { this.getProductTRs() }
                </tbody>
            </Table>
        )
    }

    getProductTRs() {
        console.log("getProductTRs");
        return this.getProductListFilteredSortedAndPaginated().map((product) => {
            return (
                <tr key={ product.id }>
                    <td>{ product.id }</td>
                    <td>{ product.name }</td>
                    <td>${ Number(product.value).toFixed(2) }/lb</td>
                    <td>{ dateformat(product.createdDate, "dddd, mmmm dS, yyyy, h:MM:ss TT") }</td>
                </tr>
            );
        });
    }

    getLoadingMessage() {
        return (
            <h3>Loading...</h3>
        )
    }

    render() {
        return <div className="main">
            <h1>Products</h1>
            { (this.state.products.loading) ? this.getLoadingMessage() : this.getProductsTable() }
        </div>
    }

}
function mapStateToProps(state) {
    return {
        products: state.loadStoreReducer.products
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);