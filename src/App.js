import React, { useState, useEffect } from 'react';
import UrlForm from './componets/UrlForm';
import UrlList from './componets/UrlList';
import ThemeToggle from './componets/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';
import './css/theme.css';
import './App.css';


function App() {
  const [testResponse, setTestResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTestResponse(data);
      setError(null);
    } catch (err) {
      setError(`Error fetching test data: ${err.message}`);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleUrlAdded = () => {
    fetchUrls();
  };

  return (
    <ThemeProvider>
      <div className="app">
        <header className="app-header">
          <h1>URL Shortener</h1>
          <ThemeToggle />
        </header>

        <main>
          <UrlForm onUrlAdded={handleUrlAdded} />

          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <UrlList
              urls={testResponse?.urls}
              error={error}
            />
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;