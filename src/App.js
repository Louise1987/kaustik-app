import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
const uuid = require('uuid');

class App extends Component {
	
		constructor(props) {
			super(props);
			// gör strängar av state
			this.state = {
				uid: uuid.v1(),
				meeting:'',
				name:'',
				email:'',
			};
			
			// binder propertys till click funktion 
			this.handleClick = this.handleClick.bind(this);
			this.handleChange = this.handleChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
			// this.handleSearch = this.handleSearch.bind(this);
			this.inputData = this.inputData.bind(this);

			// kopplar databas
			var config = {
				apiKey: "AIzaSyALbIk_xpaFuqp5CcAaiAGm3orepNx17xA",
				authDomain: "kaustik-643f6.firebaseapp.com",
				databaseURL: "https://kaustik-643f6.firebaseio.com",
				projectId: "kaustik-643f6",
				storageBucket: "kaustik-643f6.appspot.com",
				messagingSenderId: "61029332159"
			};
			firebase.initializeApp(config);
			// console.log(firebase);

			// Instans för att skriva data till och från databas
			// skapar databasen lokalt med referens ref
			var database = firebase.database();
			var ref = database.ref('Newdata');

			// variabel data med sträng
			var data ={
				test:'',
			}
			// Pushar upp data till databas
			 ref.push(data);

				// import firebase och ref sträng
				firebase
				.database()
				.ref(`Newdata/${this.state.uid}`)
				.on('value', snap => console.log('from db', snap.val()));
		}
		
		// hämtar klick för mötes knappar och skriver ut text i knappar
		handleClick(item){
			const date = item;
			this.setState({date});
		}

		// hämtar API för olika möten 
		componentDidMount(){
			fetch('http://www.mocky.io/v2/5c9cdca03300004d003f2151')
			.then(res => res.json())
			.then(json => {
				let meetings = []
				json.forEach(meeting => {
					if(new Date(meeting.startDate).getDay() !== new Date(meeting.endDate).getDay()){
						let day1 = {
							activity:meeting.activity,
							location:meeting.location,
							startDate:meeting.startDate,
						}
						let day2 = {
							activity:meeting.activity,
							location:meeting.location,
							endDate:meeting.endDate,
						}

						meetings.push(day1,day2)

					}else{
						meetings.push(meeting)
					}

				});
				this.setState({
					isLoaded:true,
					items: meetings,
					
				})
			});

		}
		// hämtar ny data 
		handleChange(e){
		this.setState({
			name: e.target.name});		
	}

	// hämtar ref och skriver ut sträng med set till firebase
	handleSubmit(e){
		alert('Er bokning är bekräftad: ' + this.state.value);
		console.log('Du har bekräftat er bokning')
		window.location.reload();
		e.preventDefault();
		firebase
		.database()
		.ref(`Newdata/${this.state.uid}`)
		.set({
			name: this.state.name,
			email: this.state.email,
			date: this.state.date,
		})
		.catch(error => console.log(error));
	}

// knyter input text till property
	inputData (_e){
		const name = this.refs.name1.value;
		const email = this.refs.email1.value;
		this.setState({ name, email});
	}

	handleSearch(e){

	}

  render() { 

		var { isLoaded, items } = this.state;
		if (!isLoaded){
			return <div>Loading...</div>;
		}
		else {
    return (
			<>
      <div className="App">
				<div className="AppHeader">
					<h1 className="header-block__title">Boka ditt möte nedan</h1>
				</div>
    
				
      </div>

		<div className="booking-block__form">
			
				<form onSubmit={this.handleSubmit} className="booking-form-block__select">
				<ul className="list-block">
					{items.map((item,i) => (
						<li className="list-block_item" key={i}>

					{/* kopplar handleClick till onChange*/}
							<input className="input-block__select" type="radio" onClick={(e) => this.handleClick(item)} name="[date]" ref="activity" />
							<label>
							{item.activity}<br/>
							Starttid: {item.startDate}<br/>
							Sluttid: {item.endDate}<br/> 
							Plats: {item.location}<br/>
							</label>
						</li>
					))}
					
					</ul>
					<div className="input-block">
						<label >
							<input className="input-block__item" type="text" value={this.state.name} onChange={this.inputData} placeholder="Namn"
							ref="name1"/>
						</label>
						<br/>
						<label>
							<input className="input-block__item" type="text" value={this.state.email} onChange={this.inputData} placeholder="E-mail"
							ref="email1"/>
						</label>
						
						<input className="input-block__confirm" type="submit" value="Bekräfta" />
					</div>
				</form>
				
				{/* Ej färdig sökfunktion */}
				{/* <div className="search-block">
					<form className="">
						<input className="input-block__search" type="text" onChange={this.handleSearch} placeholder="Search..." />
						<input className="input-block__search-confirm" type="submit" value="Sök" /> 
							<ul>

							</ul>
					</form>	
				</div> */}
		</div>		
				</>
    );
	}
	
}
	
}

export default App;
