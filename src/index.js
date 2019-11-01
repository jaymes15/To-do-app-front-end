import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


class ContentFeed extends React.Component{
    constructor(props) {
    	super(props);
    	this.state ={
    		items : [],
    		oneitem:'',
    		title: null,
    		description:null
    	}
    	this.getoneItem = this.getoneItem.bind(this);
    	this.myChangeHandler = this.myChangeHandler.bind(this);
    	this.mySubmitHandler = this.mySubmitHandler.bind(this);
    };
	componentDidMount(){
		this.getItems();
	};

	getItems() {
		fetch('http://127.0.0.1:8000/api/item/')
		.then(results => results.json())
		.then(results => this.setState({ items : results }));
	};

 	getoneItem(num) {
		console.log('http://127.0.0.1:8000/api/item/'+num)
		fetch('http://127.0.0.1:8000/api/item/'+num)
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
    	 $.post('http://127.0.0.1:8000/api/item/',
				  {
				    title: this.state.title,
				    description: this.state.description
				  },
				  function(data, status){
				    alert("Data: " + data + "\nStatus: " + status);
				   
				  });
    	  fetch('http://127.0.0.1:8000/api/item/')
		  .then(results => results.json())
		  .then(results => this.setState({ items : results }));
		  
	}

	render(){
		return (
			<div>


				 <form onSubmit={this.mySubmitHandler}>
				      
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
				      <input type='submit'/>
				</form>
				<h1>{this.state.oneitem.id}</h1>
				<h1>{this.state.oneitem.title}</h1>
				<h1>{this.state.oneitem.description}</h1>






				<ul> {this.state.items.map((item, index) => {
					return <div key = {index} >
									<h1>ID: {item.id} </h1>
									<h1>title: {item.title}</h1>
						   			<h1>description: {item.description}</h1>
						   			<button onClick = {(e) => this.getoneItem(item.id,e)} > view more</button>
						   			<hr/>
						   </div>
				})} </ul>
			</div>

			);
	}
}

ReactDOM.render(
		<ContentFeed/>,
		document.getElementById('root')
	);