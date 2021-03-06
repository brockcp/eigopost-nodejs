import React,{useState,useEffect} from 'react';
import './ThemeToggle.css';

const Toggle = () => {
  const [value, setValue] = useState(false);
  let theme = localStorage.getItem('theme');
  const handleOnClick = () => {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-light');
      setValue(false);
    } else {
      setTheme('theme-dark');
      setValue(true);
    }
  }
  useEffect(() => {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setValue(true)
    } else if (localStorage.getItem('theme') === 'theme-light') {
      setValue(false)
    }
  }, [theme])
  return(
    <div className="toggle-container">
     <label>
      <input
      name="switch"
      id="switch"
      type="checkbox"
      checked={value}
      onChange={handleOnClick}
      className="checkbox"
      hidden
      />
      <label className="switch" htmlFor="switch" />
    </label>
    </div>
  );
};
const keepTheme = () => {
  if (localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-dark');
    } else if (localStorage.getItem('theme') === 'theme-light') {
      setTheme('theme-light')
    }
  } else {
    setTheme('theme-light')
  }
}
const setTheme = (themeName) => {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

export {Toggle, keepTheme, setTheme};
