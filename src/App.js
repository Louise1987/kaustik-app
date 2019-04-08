import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
					<p>
						Skriv ditt schema
					</p>
					<div class="input-block">
						<input type="text" placeholder="Aktivitet" />
							<label for="meeting">Välj start tid</label>
						<input type="datetime-local" id="meeting-time"
       				name="meeting-time" placeholder="Starttid" />
							<label for="meeting">Välj slut tid</label>
						<input type="datetime-local" id="meeting-time"
       				name="meeting-time" placeholder="Sluttid" />
						<input type="text" placeholder="Plats" />
					</div>
					<div class="block-button"><button onClick="Add">Spara</button></div>
        </header>
      </div>
    );
  }
}

export default App;
