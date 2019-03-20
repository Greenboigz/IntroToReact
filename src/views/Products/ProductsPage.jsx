import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Pagination } from 'react-bootstrap';
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
                    pageSize: 10
                }
            }
        }


    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            products: nextProps.products
        });
    }

    getTotalPages() {
        return Math.floor(this.getProductListFilteredAndSorted().length / this.state.query.page.pageSize)
    }

    changePage(pageNumber) {
        this.setState({
            query: {
                ...this.state.query,
                page: {
                    ...this.state.query.page,
                    currentPage: pageNumber
                }
            }
        })
    }

    getProductListFilteredAndSorted() {
        if (this.state.products && this.state.products.list) {
            var products_list = this.state.products.list;
            if (this.state.query.filters.length > 0) {
                products_list = products_list.filter(product => {
                    var include = true;
                    for (var filter in this.state.query.filters) {
                        include &= filter.values.indexOf(product[filter.key]) !== -1;
                    }
                    return true;
                });
            }
            if (this.state.query.sort.id !== "") {
                products_list.sort((p1, p2) => {
                    return (this.state.query.sort.direction === "ASC") ? p1[this.state.query.sort.column] - p2[this.state.query.sort.column] : p2[this.state.query.sort.column] - p1[this.state.query.sort.column];
                })
            }
            return products_list;
        } else {
            return [];
        }
    }

    getProductListFilteredSortedAndPaginated() {
        if (this.state.products && this.state.products.list) {
            var products_list = this.state.products.list;
            if (this.state.query.filters.length > 0) {
                products_list = products_list.filter(product => {
                    var include = true;
                    for (var filter in this.state.query.filters) {
                        include &= filter.values.indexOf(product[filter.key]) !== -1;
                    }
                    return true;
                });
            }
            if (this.state.query.sort.id !== "") {
                products_list.sort((p1, p2) => {
                    return (this.state.query.sort.direction === "ASC") ? p1[this.state.query.sort.column] - p2[this.state.query.sort.column] : p2[this.state.query.sort.column] - p1[this.state.query.sort.column];
                })
            }
            if (products_list.length > this.state.query.page.pageSize) {
                products_list = products_list.filter((product, index) => {
                    return Math.floor(index / this.state.query.page.pageSize) === this.state.query.page.currentPage - 1;
                })
            }
            return products_list;
        } else {
            return [];
        }
    }

    getPagination() {
        return (
            <Pagination>
                <Pagination.First disabled={this.state.query.page.currentPage === 1} 
                    onClick={ () => this.changePage(1) } />
                <Pagination.Prev disabled={this.state.query.page.currentPage === 1} 
                    onClick={ () => this.changePage(this.state.query.page.currentPage - 1) } />
                { (this.state.query.page.currentPage > 2) ? <Pagination.Ellipsis disabled /> : null }
                { 
                    (this.state.query.page.currentPage > 1) ? 
                        <Pagination.Item onClick={ () => this.changePage(this.state.query.page.currentPage - 1) }>{ this.state.query.page.currentPage - 1 }</Pagination.Item> : 
                        null 
                }
                <Pagination.Item active>{ this.state.query.page.currentPage }</Pagination.Item>
                { 
                    (this.state.query.page.currentPage < this.getTotalPages() - 1) ? 
                        <Pagination.Item onClick={ () => this.changePage(this.state.query.page.currentPage + 1) }>{ this.state.query.page.currentPage + 1 }</Pagination.Item> : 
                        null 
                }
                { (this.state.query.page.currentPage < this.getTotalPages() - 2) ? <Pagination.Ellipsis disabled /> : null }
                <Pagination.Next disabled={this.state.query.page.currentPage === this.getTotalPages()} 
                    onClick={ () => this.changePage(this.state.query.page.currentPage + 1) } />
                <Pagination.Last disabled={this.state.query.page.currentPage === this.getTotalPages()} 
                    onClick={ () => this.changePage(this.getTotalPages()) } />
            </Pagination>
        )
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
                <tfoot>
                    <tr>
                        <th colSpan={4}>
                            { this.getPagination() }
                        </th>
                    </tr>
                </tfoot>
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