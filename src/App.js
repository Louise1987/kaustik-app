import React, { Component } from 'react';
import './App.css';


class App extends Component {
	
		constructor(props) {
			super(props);
			this.state = {
				shown: true,
				items: [],
				isLoaded: false,
			}
		}

		componentDidMount(){
			fetch('http://www.mocky.io/v2/5c9cdca03300004d003f2151')
			.then(res => res.json())
			.then(json => {
				this.setState({
					isLoaded:true,
					items: json,
				})
			});
		}

		toggle() {
			this.setState({
				shown: !this.state.shown
			});
		}

  render() {
			var shown = {
				display: this.state.shown ? "block" : "none"
			};

			var hidden = {
				display: this.state.shown ? "none" : "block"
			}

		var { isLoaded, items } = this.state;

		if (!isLoaded){
			return <div>Loading...</div>;
		}
		else {

    return (
      <div className="App">
				<div className="AppHeader">
					<h1>Boka ditt möte nedan</h1>
				</div>
        <ul>
					{items.map(item => (
						<li key={item.id} style={shown}> 
							<button className="select" style={ shown }> 
							{item.activity}<br/>
							Starttid: {item.startDate}<br/>
							Sluttid: {item.endDate}<br/> 
							Plats: {item.location}<br/>
						</button>
						</li>
					))}
					</ul>
				{/* visas inte innan möte valts */}
					<button className="saveBooking" style={hidden}></button> 
      </div>
    );
	}
}
}


export default App;
