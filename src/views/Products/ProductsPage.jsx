import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Pagination } from 'react-bootstrap';
import icons from 'glyphicons';
import dateformat from 'dateformat';
import ClipLoader from 'react-spinners/ClipLoader';
import ProductsFilter from './ProductsFilter';
import { withRouter } from 'react-router-dom';

class ProductsPage extends Component {

    constructor(props) {
        super(props);

        this.handleFilter = this.handleFilter.bind(this);

        this.state = {
            products: props.products || {
                loading: false,
                list: [],
                error: false
            },
            query: {
                sort: {
                    column: "id",
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
        return Math.ceil(this.getProductListFilteredAndSorted().length / this.state.query.page.pageSize)
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

    toggleSort(columnName) {
        if (this.state.query.sort.column === columnName) {
            this.setState({
                query: {
                    ...this.state.query,
                    page: {
                        ...this.state.query.page,
                        currentPage: 1
                    },
                    sort: {
                        ...this.state.query.sort,
                        direction: (this.state.query.sort.direction === "ASC") ? "DESC" : "ASC"
                    }
                }
            });
        } else {
            this.setState({
                query: {
                    ...this.state.query,
                    page: {
                        ...this.state.query.page,
                        currentPage: 1
                    },
                    sort: {
                        column: columnName,
                        direction: "ASC"
                    }
                }
            });
        }
    }

    compareItems(item1, item2) {
        if (this.state.query.sort.direction === "ASC") {
            if (item1[this.state.query.sort.column] < item2[this.state.query.sort.column])
                return -1;
            if (item1[this.state.query.sort.column] > item2[this.state.query.sort.column])
                return 1;
            return 0;
        } else {
            if (item2[this.state.query.sort.column] < item1[this.state.query.sort.column])
                return -1;
            if (item2[this.state.query.sort.column] > item1[this.state.query.sort.column])
                return 1;
        }
    }

    getProductListFilteredAndSorted() {
        if (this.state.products && this.state.products.list) {
            var products_list = this.state.products.list;
            if (this.state.query.filters.length > 0) {
                products_list = products_list.filter(product => {
                    var include = true;
                    this.state.query.filters.forEach(filter => include &= filter(product));
                    return include;
                });
            }
            if (this.state.query.sort.column !== "") {
                products_list.sort((p1, p2) => this.compareItems(p1, p2));
            }
            return products_list;
        } else {
            return [];
        }
    }

    getProductListFilteredSortedAndPaginated() {
        if (this.state.products && this.state.products.list) {
            var products_list = this.getProductListFilteredAndSorted();
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
            <Pagination className=" justify-content-center">
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

    getArrow(columnName) {
        if (this.state.query.sort.column === columnName) {
            return (this.state.query.sort.direction === "DESC") ? icons.arrowTriD : icons.arrowTriU;
        }
    }

    getProductsTable() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr className="clickable">
                        <th onClick={ () => this.toggleSort("id") }># { this.getArrow("id") }</th>
                        <th onClick={ () => this.toggleSort("name") }>Product Name { this.getArrow("name") }</th>
                        <th onClick={ () => this.toggleSort("value") }>Current Value { this.getArrow("value") }</th>
                        <th onClick={ () => this.toggleSort("createdDate") }>Created Date { this.getArrow("createdDate") }</th>
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
        return this.getProductListFilteredSortedAndPaginated().map((product) => {
            return (
                <tr key={ product.id } onClick={ () => { this.props.history.push({ pathname: "/demo/products/" + product.id }) } }>
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
            <div className="loading-page">
                <h2>Loading</h2>
                <ClipLoader sizeUnit={"px"} size={150} color={"#123abc"} loading={this.state.products.loading} />
            </div>
        )
    }

    handleFilter(filters) {
        this.setState({
            query: {
                ...this.state.query,
                filters
            }
        })
    }

    render() {
        return <div className="main">
            <h1>Products</h1>
            <ProductsFilter onSubmit={ this.handleFilter } />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductsPage));