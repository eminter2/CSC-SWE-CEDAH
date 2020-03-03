import React from 'react';
import '../styles/App.scss';
import PageHeader from '../components/PageHeader'

function App() {
  return (
    <div>
      <PageHeader/>
      <div className="welcome-box">
        <h1>Welcome to MeetUP</h1>
      </div>
    </div>
  );
}

export default App;
