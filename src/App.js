import React, { Component } from 'react';
import './App.css';
import firebase from "firebase/app";
import "firebase/database";
import { DB_CONFIG } from "./Config/Firebase/db_config";
import Card from "./Card/Card";
import NewCard from './NewCard/NewCard';

class App extends Component {

  // reference to firebase
  app = firebase.initializeApp(DB_CONFIG);
  database = this.app.database().ref().child('cards');

  state = {
    cards: [],
    qNum: null,
    loaded : false,
    curQuest : {}
  }

  componentWillMount() {
    const currentCards = [];
    // get last question number so we can tell when entire list is uploaded
    this.database.limitToLast(1).once('child_added', snap => {
      this.setState({ qNum: snap.val().q })
      this.database.on('child_added', snap => {
        currentCards.push({
          id: snap.key,
          question: snap.val().question,
          answer: snap.val().answer,
          asked: snap.val().asked
        })
        // update loaded only when all questions are loaded
        if(currentCards.length === this.state.qNum){
          this.setState({loaded : true, cards: currentCards})
          this.filterCards();
        }
      })
    })
  }

  filterCards = () => {
    // filter and return unasked questions only
    const unAsked = [
      ...this.state.cards.filter(c => c.asked === false )
    ]

    this.selectRandomCard(unAsked);
  }

  selectRandomCard = (collection) => {
    let idx = Math.floor(Math.random() * collection.length);
    const curQuest = collection[idx];

    // set curQuest asked property to true
    curQuest.asked = true;

    this.setState({
      cards : collection,
      curQuest : curQuest
    })
  }

  render() {
    // wait for all data before displaying card
    let card = 'Loading ...',
        btn = null;

    if(this.state.loaded) {
      card = <Card 
                question={this.state.curQuest.question}
                answer={this.state.curQuest.answer} />
      btn = <NewCard next={this.filterCards} />
    }
    return (
      <div className="App">
        {card}
        {btn}
      </div>
    );
  }
}

export default App;
