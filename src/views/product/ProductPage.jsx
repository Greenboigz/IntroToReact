import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Nav } from 'react-bootstrap';
import PurchasesTable from './PurchasesTable';
import dateformat from 'dateformat';
import ClipLoader from 'react-spinners/ClipLoader';
import { LineChart } from 'react-d3-components';
import { EXPERIMENT_START_DATE, A_DAY } from '../../helpers/helper';

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
            product = this.props.products.list.find(product => product.id === parseInt(this.props.match.params.id));
            purchases = this.props.purchases.list.filter(purchase => purchase.productId === parseInt(this.props.match.params.id));
    
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
            graphData: [],
            display: "product"
        }

        this.handleNavSelect = this.handleNavSelect.bind(this);
    }

    generateGraphValues(purchase_list) {
        var today = new Date(EXPERIMENT_START_DATE);
        const values = [];
        var total = 0;
        const sumTodaysTotals = purchase => {
            if (purchase.purchaseDate.getDate() === today.getDate()) {
                total += purchase.quantity;
            }
        }
        while (today < new Date()) {
            total = 0;
            purchase_list.forEach(sumTodaysTotals);
            values.push({ x: today.getDate(), y: total });
            today += A_DAY;
        }
        return values;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.products && nextProps.purchases) {
            const product = nextProps.products.list.find(product => product.id === parseInt(nextProps.match.params.id));
            const purchase_list = nextProps.purchases.list.filter(purchase => purchase.productId === parseInt(nextProps.match.params.id));
            
            if (product) {
                const graphData = [
                    {
                        label: product.name,
                        values: this.generateGraphValues(purchase_list)
                    }
                ]
                product.quantitySold = 0;
                purchase_list.forEach(purchase => {
                    product.quantitySold += purchase.quantity
                });
                this.setState({
                    purchases: {
                        ...nextProps.purchases,
                        purchases: purchase_list
                    },
                    product,
                    graphData,
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
        // return (
        //     <div>
        //         <LineChart 
        //             data={this.state.graphData}
        //             width={800}
        //             height={400}
        //             margin={{top: 10, bottom: 50, left: 50, right: 10}} />
        //     </div>
        // );
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
            return <PurchasesTable product={ this.state.product } purchases={this.state.purchases} />
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