import React,{Component} from "react";
import CustomerDataService from "../services/customer.service";
import TemplateDataService from "../services/template.service";
import {Link} from "react-router-dom";


export default class Preview extends Component{

    constructor(props) {
        super(props);
        console.log(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrieveCustomers = this.retrieveCustomers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveCustomer = this.setActiveCustomer.bind(this);
        this.getTemplate = this.getTemplate.bind(this);
        this.translate = this.translate.bind(this);
        this.searchName = this.searchName.bind(this);

        this.state = {
            customers: [],
            currentCustomer: null,
            currentIndex: -1,
            searchName: "",
            currentTemplate:""
        };
    }

    componentDidMount(){
        this.retrieveCustomers();
        this.getTemplate(this.props.match.params.id);
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

    getTemplate(id) {
        TemplateDataService.get(id)
        .then(response =>{
            this.setState({
                currentTemplate:response.data
            });
            console.log(response.data.content);
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

    translate(){
        let productsHTML="";
        if (this.state.currentCustomer.last_order) {
           let products = this.state.currentCustomer.last_order.products
           console.log(products);
           for (let product of products) {
               console.log(product.product_name)
             productsHTML+="<li>"+product.product_name+"</li>"
           }
        } else {
            
        }
       
        let currentTemplateContent= this.state.currentTemplate.content;
        let currentTemplateTranslation = currentTemplateContent.replace("{{customer.firstname}}",this.state.currentCustomer.firstname);
        currentTemplateTranslation = currentTemplateTranslation.replace("{{customer.lastname}}",this.state.currentCustomer.lastname);
        currentTemplateTranslation = currentTemplateTranslation.replace("{{products}}",productsHTML);
        currentTemplateTranslation = currentTemplateTranslation.replace(/\\n/g, '');

        return {__html: currentTemplateTranslation};
        
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
            const { searchName, customers, currentCustomer, currentIndex, currentTemplate} = this.state;
            
            console.log(currentTemplate,currentCustomer);
            return(
                <div id="customerList" className="list row">
                    <div className="title col-md-12">
                        <h4>Preview</h4>
                    </div>
                    <div id="searchbar-customers" className="col-md-12">
                        <div className="input-group mb-3">
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Search a customer by e-mail"
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
                                <h5>Preview with Customer Data</h5>
                                <div dangerouslySetInnerHTML={this.translate()}></div>
                                {/* {currentTemplate.content}
                                {currentCustomer.firstname}
                                {currentCustomer.lastname} */}
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
