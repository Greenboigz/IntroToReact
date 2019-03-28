import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Pagination } from 'react-bootstrap';
import icons from 'glyphicons';
import dateformat from 'dateformat';
import ClipLoader from 'react-spinners/ClipLoader';
import PurchasesFilter from './PurchasesFilter';

class PurchasesPage extends Component {

    constructor(props) {
        super(props);

        this.handleFilter = this.handleFilter.bind(this);

        this.state = {
            purchases: props.purchases || {
                loading: false,
                list: [],
                error: false
            },
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
        console.log(nextProps);
        this.setState({
            purchases: nextProps.purchases
        });
    }

    getTotalPages() {
        return Math.ceil(this.getPurchaseListFilteredAndSorted().length / this.state.query.page.pageSize)
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

    getPurchaseListFilteredAndSorted() {
        if (this.state.purchases && this.state.purchases.list) {
            var purchases_list = this.state.purchases.list;
            if (this.state.query.filters.length > 0) {
                purchases_list = purchases_list.filter(purchase => {
                    var include = true;
                    this.state.query.filters.forEach(filter => include &= filter(purchase));
                    return include;
                });
            }
            if (this.state.query.sort.column !== "") {
                purchases_list.sort((p1, p2) => this.compareItems(p1, p2));
            }
            return purchases_list;
        } else {
            return [];
        }
    }

    getPurchaseListFilteredSortedAndPaginated() {
        if (this.state.purchases && this.state.purchases.list) {
            var purchases_list = this.getPurchaseListFilteredAndSorted();
            if (purchases_list.length > this.state.query.page.pageSize) {
                purchases_list = purchases_list.filter((purchase, index) => {
                    return Math.floor(index / this.state.query.page.pageSize) === this.state.query.page.currentPage - 1;
                })
            }
            return purchases_list;
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

    getPurchasesTable() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr className="clickable">
                        <th onClick={ () => this.toggleSort("id") }># { this.getArrow("id") }</th>
                        <th onClick={ () => this.toggleSort("productName") }>Product Name { this.getArrow("productName") }</th>
                        <th onClick={ () => this.toggleSort("quantity") }>Quantity { this.getArrow("quantity") }</th>
                        <th onClick={ () => this.toggleSort("purchaseCost") }>Purchase Cost { this.getArrow("purchaseCost") }</th>
                        <th onClick={ () => this.toggleSort("purchaseDate") }>Purchase Date { this.getArrow("purchaseDate") }</th>
                    </tr>
                </thead>
                <tbody>
                    { this.getPurchaseTRs() }
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={5}>
                            { this.getPagination() }
                        </th>
                    </tr>
                </tfoot>
            </Table>
        )
    }

    getPurchaseTRs() {
        return this.getPurchaseListFilteredSortedAndPaginated().map((purchase) => {
            return (
                <tr key={ purchase.id }>
                    <td>{ purchase.id }</td>
                    <td>{ purchase.productName }</td>
                    <td>{ purchase.quantity } lbs</td>
                    <td>${ Number(purchase.purchaseCost).toFixed(2) }</td>
                    <td>{ dateformat(purchase.purchaseDate, "dddd, mmmm dS, yyyy, h:MM:ss TT") }</td>
                </tr>
            );
        });
    }

    getLoadingMessage() {
        return (
            <div className="loading-page">
                <h2>Loading</h2>
                <ClipLoader sizeUnit={"px"} size={150} color={"#123abc"} loading={this.state.purchases.loading} />
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
            <h1>Purchase History</h1>
            <PurchasesFilter onSubmit={ this.handleFilter } />
            { (this.state.purchases.loading) ? this.getLoadingMessage() : this.getPurchasesTable() }
        </div>
    }

}

function mapStateToProps(state) {
    if (state.loadStoreReducer.purchases && state.loadStoreReducer.purchases.list) {
        const getProduct = id => state.loadStoreReducer.products.list.find(product => product.id === id);
        const purchase_list = state.loadStoreReducer.purchases.list.map(purchase => {
            const product = getProduct(purchase.productId);
            return {
                ...purchase,
                productName: product.name,
                productValue: product.value,
                purchaseCost: product.value * purchase.quantity
            }
        });
        return {
            purchases: {
                ...state.loadStoreReducer.purchases,
                list: purchase_list
            }
        };
    } else {
        return {};
    }
}

function mapDispatchToProps(dispatch) {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchasesPage);