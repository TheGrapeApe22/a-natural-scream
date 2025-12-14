import React, { useState } from 'react';
import Clock from './components/Clock';
import './App.css';

type TabKey = 'home' | 'tasks' | 'settings';

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <div className="page">
          <Clock />
        </div>;
      case 'tasks':
        return <div className="page">Your Tasks</div>;
      case 'settings':
        return <div className="page">Settings</div>;
      default:
        return null;
    }
  };

  return (
    <div className="App app-shell">
      <main className="content" role="main">
        {renderPage()}
      </main>

      <nav className="tabbar" role="tablist" aria-label="Bottom navigation">
        <button
          className={`tab ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        <button
          className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          Tasks
        </button>
        <button
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </nav>
    </div>
  );
}

export default App;