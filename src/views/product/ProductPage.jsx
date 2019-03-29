import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Nav } from 'react-bootstrap';
import PurchasesTable from './PurchasesTable';
import dateformat from 'dateformat';
import ClipLoader from 'react-spinners/ClipLoader';

class ProductPage extends Component {

    constructor(props) {
        super(props);

        var product = {};
        var purchases = props.purchases || {
            loading: true,
            list: [],
            error: null
        };

        if (this.props.products && this.props.purchases) {
            product = this.props.products.list.find(product => product.id == parseInt(this.props.match.params.id));
            purchases = this.props.purchases.list.filter(purchase => purchase.productId == parseInt(this.props.match.params.id));
    
            if (product) {
                product.quantitySold = 0;
                purchases.forEach(purchase => {
                    product.quantitySold += purchase.quantity
                });
            }
        }

        this.state = {
            purchases: purchases,
            product: product,
            loading: false,
            display: "product"
        }

        this.handleNavSelect = this.handleNavSelect.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.products && nextProps.purchases) {
            const product = nextProps.products.list.find(product => product.id == parseInt(nextProps.match.params.id));
            const purchases = nextProps.purchases.list.filter(purchase => purchase.productId == parseInt(nextProps.match.params.id));
            if (product) {
                product.quantitySold = 0;
                purchases.forEach(purchase => {
                    product.quantitySold += purchase.quantity
                });
                this.setState({
                    purchases: {
                        ...nextProps.purchases,
                        purchases
                    },
                    product,
                    loading: nextProps.purchases.loading || nextProps.products.loading
                });
            }
        }
    }

    handleNavSelect(eventKey) {
        this.setState({
            display: eventKey
        })
    }

    getProductInfo() {
        return (
            <Table bordered>
                <tbody>
                    <tr>
                        <th>Product Name</th>
                        <td>{ this.state.product.name }</td>
                    </tr>
                    <tr>
                        <th>Created At</th>
                        <td>{ dateformat( this.state.product.createdDate, "dddd, mmmm dS, yyyy, h:MM:ss TT") }</td>
                    </tr>
                    <tr>
                        <th>Price</th>
                        <td>${ Number(this.state.product.value).toFixed(2) }/lb</td>
                    </tr>
                    <tr>
                        <th>Total Quantity Sold</th>
                        <td>{ Number(this.state.product.quantitySold) } lbs</td>
                    </tr>
                    <tr>
                        <th>Total Revenue</th>
                        <td>${ Number(this.state.product.quantitySold * this.state.product.value).toFixed(2) }</td>
                    </tr>
                </tbody>
            </Table>
        )
    }

    getPurchasesGraph() {
        return <div></div>
    }

    getLoadingMessage() {
        return (
            <div className="loading-page">
                <h2>Loading</h2>
                <ClipLoader sizeUnit={"px"} size={150} color={"#123abc"} loading={this.state.loading} />
            </div>
        );
    }

    getPageContents() {
        if (this.state.loading) {
            return this.getLoadingMessage();
        } else if (this.state.display === "purchases") {
            return <PurchasesTable match={this.props.match} />
        } else {
            return (
                <div>
                    { this.getProductInfo() }
                    { this.getPurchasesGraph() }
                </div>
            );
        }
    }

    render() {
        return <div className="main">
            <Nav variant="pills" onSelect={ this.handleNavSelect } defaultActiveKey="product">
                <Nav.Item>
                    <Nav.Link eventKey="product">Product</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="purchases">Purchase History</Nav.Link>
                </Nav.Item>
            </Nav>
            <div className="product-page-content">
                { this.getPageContents() }
            </div>
        </div>
    }

}

function mapStateToProps(state) {
    if (state.loadStoreReducer.purchases && state.loadStoreReducer.purchases.list) {
        return {
            purchases: state.loadStoreReducer.purchases,
            products: state.loadStoreReducer.products
        };
    } else {
        return {};
    }
}

function mapDispatchToProps(dispatch) {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);