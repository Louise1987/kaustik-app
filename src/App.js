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
			// console.log(e.target.innerHTML);
			// alert('Du har valt ett möte');
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
				// console.log(meetings)
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
					<h1 class="header-title">Boka ditt möte nedan</h1>
				</div>
    
				
      </div>

		<div className="selectedMeeting">Fyll i dina uppgifter och bekräfta</div>

		<div class="bookingForm">
			
				<form onSubmit={this.handleSubmit} className="bookingSection">
				<ul>
					
				
					{items.map((item,i) => (
						<li key={i}>

					{/* kopplar handleClick till onChange*/}
							<input type="radio" onClick={(e) => this.handleClick(item)} name="[date]" ref="activity" className="select"/>
							<label>
							{item.activity}<br/>
							Starttid: {item.startDate}<br/>
							Sluttid: {item.endDate}<br/> 
							Plats: {item.location}<br/>
							</label>
						</li>
					))}
					
					</ul>
					<label>
						Name:
						<input type="text" value={this.state.name} onChange={this.inputData}
						ref="name1"/>
					</label>
					<br/>
					<label>
						E-mail:
						<input type="text" value={this.state.email} onChange={this.inputData}
						ref="email1"/>
					</label>
					<input className="confirm" type="submit" value="Bekräfta" />
				</form>
				<div className="viewSelect"></div>
				</div>
				</>
    );
	}

}
}

export default App;
