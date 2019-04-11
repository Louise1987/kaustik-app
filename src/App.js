import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';

class App extends Component {
	
		constructor(props) {
			super(props);

			var config = {
				apiKey: "AIzaSyALbIk_xpaFuqp5CcAaiAGm3orepNx17xA",
				authDomain: "kaustik-643f6.firebaseapp.com",
				databaseURL: "https://kaustik-643f6.firebaseio.com",
				projectId: "kaustik-643f6",
				storageBucket: "kaustik-643f6.appspot.com",
				messagingSenderId: "61029332159"
			};
			firebase.initializeApp(config);
			console.log(firebase);

			var database = firebase.database();
			var ref = database.ref('meeting');

			var data ={
				name: "LTE",
				meeting: 1
			}
			ref.push(data);

			this.state = {
				items: [],
				isLoaded: false,

			}
		}
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
				console.log(meetings)
				this.setState({
					isLoaded:true,
					items: meetings,
				})
			});
		}

	

  render: function() {

		let items = this.props.items;

		var { isLoaded, items } = this.state;

		if (!isLoaded){
			return <div>Loading...</div>;
		}
		else {

    return (
			<>
      <div className="App">
				<div className="AppHeader">
					<h1>Boka ditt möte nedan</h1>
					
				</div>
        <ul>
					{() =>{
					{items.map((item) => (
						let boundItemClick = this.onItemClick.bind(this, item);
						return
						<li key={item.id} onClick={boundItemClick}>
							{items.title}
							<button className="select">
							{item.activity}<br/>
							Starttid: {item.startDate}<br/>
							Sluttid: {item.endDate}<br/> 
							Plats: {item.location}<br/>
							</button>
						</li>
					});
					}()}
					
					</ul>
				
      </div>
			onItemClick: function(item, e){
				console.log(item);
			}
			
		<div className="selectedMeeting">Fyll i dina uppgifter och bekräfta</div>
			
				<form className="bookingSection">
					<label>
						Name:
						<input type="text" name="name" />
					</label>
					<label>
						E-mail:
						<input type="text" email="email" />
					</label>
					<input className="confirm" type="submit" value="Bekräfta" />
				</form>
				<div className="viewSelect"></div>
				</>
    );
	}

}
}

export default App;
