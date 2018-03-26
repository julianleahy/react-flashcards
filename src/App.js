import React, { Component } from 'react';
import './App.css';
import firebase from "firebase/app";
import "firebase/database";
import { DB_CONFIG } from "./Config/Firebase/db_config";

class App extends Component {

  // reference to firebase
  app = firebase.initializeApp(DB_CONFIG);
  database = this.app.database().ref().child('cards');

  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
