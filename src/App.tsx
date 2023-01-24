import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

interface State {
  tarhelyek: Tarhely[];
  newNev: string;
  newMeret: number;
  newAr: number;
}

interface Tarhely {
  id: number;
  nev : string;
  meret : number;
  ar : number;
}

interface TarhelyListResponse {
  tarhely: Tarhely[];
}


class App extends Component<{}, State> {

  constructor(props: {}) {
    super(props);

    this.state = {
      newNev: '',
      newMeret: 0,
      newAr: 0,
      tarhelyek: [],
    }
  }


  async loadTarhely() {
    let response = await fetch('http://localhost:3000/api/tarhely');
    let data = await response.json() as TarhelyListResponse;
    this.setState({
      tarhelyek: data.tarhely,
    })
  }

  componentDidMount() {
    this.loadTarhely();
  }

  handleFelvetel =async () => {
    const { newNev, newMeret, newAr } = this.state;
    if(newNev.trim() === '' || newMeret <=0 || newAr <=0) {
      return;
    }

    const adat = {
      nev: newNev,
      meret: newMeret,
      ar: newAr,
    };

    let response = await fetch('http://localhost:3000/api/tarhely', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(adat),
    });

    this.setState({
      newNev: '',
      newMeret: 0,
      newAr: 0,
    })

    await this.loadTarhely();

  }


  render(){
    const { newNev, newMeret, newAr} = this.state;

    return <div>
      <h2>Uj Tárhely</h2>
      Név: <input type='text' value={newNev} onChange={e => this.setState({newNev: e.currentTarget.value})}></input><br/>
      Méret: <input type='number' value={newMeret} onChange={e => this.setState({ newMeret: parseInt(e.currentTarget.value)})}></input><br/>
      Ár: <input type='number' value={newAr} onChange={e => this.setState({ newAr: parseInt(e.currentTarget.value)})}></input><br/>
      <button onClick={this.handleFelvetel}>Felvétel</button>
      
      <h1>Tárhelyek:</h1>
      <ul>
        {
          this.state.tarhelyek.map(tarhely => <li>{tarhely.nev} | {tarhely.meret} | {tarhely.ar}</li>)
        }
      </ul>

    </div>
  }
}

export default App;
