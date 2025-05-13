
import React from 'react';

const ThemeToggle = ({ theme, setTheme }) => {
  return (
    <div className="theme-toggle">
      <label>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
        {theme === 'light' ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </label>
    </div>
  );
};

export default ThemeToggle;
