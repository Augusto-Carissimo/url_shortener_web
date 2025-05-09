import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import '../css/ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle">
      <input
        type="checkbox"
        id="theme-switch"
        className="theme-checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <label htmlFor="theme-switch" className="theme-label">
        <span className="theme-icon">
          {theme === 'dark' ? '🌙' : '☀️'}
        </span>
        <span className="theme-text">
          {theme === 'dark' ? 'Dark' : 'Light'} Mode
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;