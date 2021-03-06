import React,{Component} from "react";
import TemplateDataService from "../services/template.service";
import {Link} from "react-router-dom";


export default class TemplateList extends Component{

    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrieveTemplates = this.retrieveTemplates.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTemplate = this.setActiveTemplate.bind(this);
        this.searchName = this.searchName.bind(this);

        this.state = {
            templates: [],
            currentTemplate: null,
            currentIndex: -1,
            searchName: ""
        };
    }

    componentDidMount(){
        this.retrieveTemplates();
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        });
    }

    retrieveTemplates(){
        TemplateDataService.getAll()
        .then(response => {
            this.setState({
                templates: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    refreshList() {
        this.retrieveTemplates();
        this.setState({
            currentTemplate:null,
            currentIndex: -1
        });
    }

    setActiveTemplate(template, index){
        this.setState({
            currentTemplate: template,
            currentIndex: index
        });
    }

    // removeAllTemplates(){
    //     TemplateDataService.dele
    // }

    searchName(){
        TemplateDataService.findByName(this.state.searchName)
        .then(response => {
            this.setState({
                templates: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

        render(){
            const { searchName, templates, currentTemplate, currentIndex} = this.state;

            return(
                <div id="templateList" className="list row">
                    <div className="title col-md-12">
                        <h4>Templates</h4>
                    </div>
                    <div id="searchbar-customers" className="col-md-12">
                        <div className="input-group mb-3">
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Name"
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
                        <h4>Template List</h4>

                        <ul className="list-group template-list">
                            {templates && templates.map((template, index) =>(
                                <li className={"list-group-item " +
                                    (index === currentIndex ? "active" : "")}
                                    onClick={()=> this.setActiveTemplate(template, index)}
                                    key= {index}>
                                        {template.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-6">
                        {currentTemplate ?(
                            <div>
                                <h4>Template</h4>
                                <div>
                                    <label>
                                        <strong>
                                            Name:
                                        </strong>
                                    </label>{" "}
                                    {currentTemplate.name}
                                </div>
                                <div>
                                    <label>
                                        <strong>Description:</strong>
                                    </label>{" "}
                                    {currentTemplate.description}
                                </div>
                                <Link
                                to={"/templates/" + currentTemplate.id}
                                className="btn btn-success btn-in-list">Edit</Link>

                                <Link
                                to={"/preview/" + currentTemplate.id}
                                className="btn btn-primary btn-in-list">Preview</Link>

                            </div>
                        ):(
                            <div>
                                <p>
                                    please click on a template...
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
}
