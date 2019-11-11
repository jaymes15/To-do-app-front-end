import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Card,  CardBody, CardTitle, CardText, Button, Container} from 'reactstrap';



class ContentFeed extends React.Component{
    constructor(props) {
    	super(props);
    	this.state ={
    		items : [],
    		oneitem:'',
    		title: null,
    		description:null,
    		id:null
    		
    	}
    	this.getoneItem = this.getoneItem.bind(this);
    	this.myChangeHandler = this.myChangeHandler.bind(this);
    	this.mySubmitHandler = this.mySubmitHandler.bind(this);
    	this.deleteItem = this.deleteItem.bind(this);
    	
    };
	componentDidMount(){
		this.getItems();
	};

	getItems() {
		fetch('http://reactdjango.pythonanywhere.com/api/item/')
		.then(results => results.json())
		.then(results => this.setState({ items : results }));
	};

 	getoneItem(num) {
		
		fetch('http://reactdjango.pythonanywhere.com/api/item/'+num)
		.then(results => results.json())
		.then(results => this.setState({ oneitem : results, items:[] }));

	};

	myChangeHandler(event){
		let nam = event.target.name;
    	let val = event.target.value;
    	
    	this.setState({[nam]: val});

	};

   mySubmitHandler = (event) => {
    	event.preventDefault();
    	console.log(this.state.title);
    	 $.post('http://reactdjango.pythonanywhere.com/api/item/',
				  {
				    title: this.state.title,
				    description: this.state.description
				  },
				  function(data, status){
				    alert("Data: " + data + "\nStatus: " + status);
				   
				  });
    	  fetch('http://reactdjango.pythonanywhere.com/api/item/')
		  .then(results => results.json())
		  .then(results => this.setState({ items : results }));
		  
	}

   mySubmitHandleredit = (event) => {
    	event.preventDefault();
    	console.log(this.state.title);
    	$.ajax({
    		type: 'PUT',
    		url: "http://reactdjango.pythonanywhere.com/api/item/"+this.state.id +"/",
    		data:{
    			title: this.state.title,
				description: this.state.description
    		}
    	});
    	fetch('http://reactdjango.pythonanywhere.com/api/item/')
		.then(results => results.json())
		.then(results => this.setState({ items : results }));
    	
	};

	deleteItem(num) {
		
		$.ajax({
    		type: 'DELETE',
    		url: "http://reactdjango.pythonanywhere.com/api/item/"+num +"/",
    	});
        fetch('http://reactdjango.pythonanywhere.com/api/item/')
    	.then(results => results.json())
    	.then(results => this.setState({ items : results }));
    	fetch('http://reactdjango.pythonanywhere.com/api/item/')
    	.then(results => results.json())
    	.then(results => this.setState({ items : results }));

		
	};

	 

	render(){
		return (
			<div>

				 <Container>
      					<Row>
        					<Col>					
        							 <form onSubmit={this.mySubmitHandler}>
										      <h3> Add New Post</h3>
										      <p>Title:</p>
										      <input
										        type='text'
										        name='title'
										        onChange={this.myChangeHandler}
										      />
										      <p>Description:</p>
										      <input
										        type='text'
										        name='description'
										        onChange={this.myChangeHandler}
										      />
										      <br/>
										      <br/>
										     <Button color="success" value='submit'>Submit </Button>
										</form>
        					</Col>
        					<Col>
        						<form onSubmit={this.mySubmitHandleredit}>
								      <h3> Edit Post</h3>
								      <p>ID:</p>
								      <input
								        type='text'
								        name='id'
								        onChange={this.myChangeHandler}
								      />
								      <p>Title:</p>
								      <input
								        type='text'
								        name='title'
								        onChange={this.myChangeHandler}
								      />
								      <p>Description:</p>
								      <input
								        type='text'
								        name='description'
								        onChange={this.myChangeHandler}
								      />
								      <br/>
								      <br/>
								     <Button color="success" value='submit'>Submit </Button>
								</form>

        					</Col>
      					</Row>
      					</Container>
      					<br/>
				
				
				<h1>{this.state.oneitem.id}</h1>
				<h1>{this.state.oneitem.title}</h1>
				<h1>{this.state.oneitem.description}</h1>






				<ul> {this.state.items.map((item, index) => {
					return (

						<div key = {index} >

							<Content item={item} />
									
						   			<Button color="primary" onClick = {(e) => this.getoneItem(item.id,e)} > view more</Button>
						   			<Button color="danger" onClick = {(e) => this.deleteItem(item.id,e)} > Delete</Button>
						   			<hr/>
						   </div>
						   )
				})} 
				</ul>
			</div>

			);
	}
}


class Content extends React.Component{
	render(){
		return (
			<div>
			<Row>
				<Col xs="6">
					<Card>
						<CardBody>
							<CardTitle>
								<h3>ID: {this.props.item.id}</h3>
								<h3>{this.props.item.title}</h3>
							</CardTitle>
							<CardText>
								{this.props.item.description}
							</CardText>
						</CardBody>
					</Card>
				</Col>
				</Row>
			
			</div>
			)}

}

ReactDOM.render(
		<ContentFeed/>,
		document.getElementById('root')
	);