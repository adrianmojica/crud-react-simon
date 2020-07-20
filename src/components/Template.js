import React,{Component} from "react";
import TemplateDataService from "../services/template.service";

export default class Template extends Component {
    
    constructor(props) {
        super (props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.getTemplate = this.getTemplate.bind(this);
        this.updateTemplate = this.updateTemplate.bind(this);
        this.deleteTemplate = this.deleteTemplate.bind(this);

        this.state = {
            currentTemplate:{
                id:null,
                name: "",
                description:"",
                content:"",
            },
            message:""
        };
    }

    componentDidMount(){
        this.getTemplate(this.props.match.params.id);
    }

    onChangeName(e){
        const name = e.target.value;
        this.setState(function(prevState){
            return {
                currentTemplate: {
                    ...prevState.currentTemplate,
                    name: name
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;
        this.setState(prevState => ({
            currentTemplate: {
                ...prevState.currentTemplate,
                description: description
            }
        }));
    }

    onChangeContent(e) {
        const content = e.target.value;
        this.setState(prevState => ({
            currentTemplate: {
                ...prevState.currentTemplate,
                content: content
            }
        }));
    }

    getTemplate(id) {
        TemplateDataService.get(id)
        .then(response =>{
            this.setState({
                currentTemplate:response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    updateTemplate(){
        TemplateDataService.update(
            this.state.currentTemplate.id,
            this.state.currentTemplate
        ).then(response =>{
            console.log(response.data);
            this.setState({
                message:"template updated successfully"
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    deleteTemplate(){
        TemplateDataService.delete(this.state.currentTemplate.id)
        .then(response => {
            console.log(response.data);
            this.props.history.push('/templates')
        })
        .catch(e => {
            console.log(e);
        });
    }

    render() {
        const { currentTemplate } = this.state; 
        return (
            <div>
                {currentTemplate ? (
                    <div id="edit-form" className="edit-form container">
                        <div className="row">
                            <h4>Template</h4>
                            <form className="col-md-12 editForm">
                                <div className="form-group col-md-12">
                                    <label htmlFor="name">Name</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentTemplate.name}
                                    onChange={this.onChangeName}
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="description">Description</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentTemplate.description}
                                    onChange={this.onChangeDescription}
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="content">Content</label>
                                    <textarea
                                    type="text"
                                    className="form-control"
                                    id="content"
                                    value={currentTemplate.content}
                                    onChange={this.onChangeContent}
                                    />
                                </div>
                            </form>
                        </div>
                        <button
                            className="btn btn-danger btn-in-list"
                            onClick={this.deleteTemplate}>
                                Delete
                            </button>
                            <button
                            type="submit"
                            className="btn btn-success btn-in-list"
                            onClick={this.updateTemplate}>
                                Update
                            </button>
                            <p>
                                {this.state.message}
                            </p>
                    </div>
                ) : (
                    <div>
                        <p>
                            Please click on a Template...
                        </p>
                    </div>
                )}
            </div>
        );
    }
}
    