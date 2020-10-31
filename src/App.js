import './App.css';
import Checkout from './checkout';
import GlobalState from './GlobalState'; 
import React from 'react';

function App() {
  const [state, setState] = React.useState({bookingDate: new Date(), persons: []});
  return (
    <GlobalState.Provider value={[state, setState]}>
      <div className="App">
        <Checkout> </Checkout>
      </div>
    </GlobalState.Provider>
  );
}

export default App;
