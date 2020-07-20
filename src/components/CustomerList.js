import React,{Component} from "react";
import CustomerDataService from "../services/customer.service";
import {Link} from "react-router-dom";


export default class CustomerList extends Component{

    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrieveCustomers = this.retrieveCustomers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveCustomer = this.setActiveCustomer.bind(this);
        this.searchName = this.searchName.bind(this);

        this.state = {
            customers: [],
            currentCustomer: null,
            currentIndex: -1,
            searchName: ""
        };
    }

    componentDidMount(){
        this.retrieveCustomers();
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        });
    }

    retrieveCustomers(){
        CustomerDataService.getAll()
        .then(response => {
            this.setState({
                customers: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    refreshList() {
        this.retrieveCustomers();
        this.setState({
            currentCustomer:null,
            currentIndex: -1
        });
    }

    setActiveCustomer(customer, index){
        this.setState({
            currentCustomer: customer,
            currentIndex: index
        });
    }

    searchName(){
        CustomerDataService.findByName(this.state.searchName)
        .then(response => {
            this.setState({
                customers: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

        render(){
            const { searchName, customers, currentCustomer, currentIndex} = this.state;

            return(
                <div id="customerList" className="list row">
                    <div className="title col-md-12">
                        <h4>Customers</h4>
                    </div>
                    <div id="searchbar-customers" className="col-md-12">
                        <div className="input-group mb-3">
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Email"
                            value = {searchName}
                            onChange={this.onChangeSearchName}
                            />
                            <div className="input-group-append">
                                <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchName}
                                > Search 
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4>Customer List</h4>

                        <ul className="list-group customer-list">
                            {customers && customers.map((customer, index) =>(
                                <li className={"list-group-item " +
                                    (index === currentIndex ? "active" : "")}
                                    onClick={()=> this.setActiveCustomer(customer, index)}
                                    key= {index}>
                                        {customer.firstname}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-6">
                        {currentCustomer ?(
                            <div>
                                <h4>Customer</h4>
                                <div>
                                    <label>
                                        <strong>
                                            Name:
                                        </strong>
                                    </label>{" "}
                                    {currentCustomer.firstname}
                                </div>
                                <div>
                                    <label>
                                        <strong>Last Name:</strong>
                                    </label>{" "}
                                    {currentCustomer.lastname}
                                </div>
                                <div>
                                    <label>
                                        <strong>E-mail:</strong>
                                    </label>{" "}
                                    {currentCustomer.email}
                                </div>
                                <div>
                                    <label>
                                        <strong>Last Order:</strong>
                                    </label>{" "}
                                    <ul>
                                       
                                    { currentCustomer.last_order && currentCustomer.last_order.products.map((value, index) => {
                                        return <li key={index}>{value.product_name}</li>
                                    })}
                                    </ul>
                                </div>
                            </div>
                        ):(
                            <div>
                                <p>
                                    please click on a customer...
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
}
