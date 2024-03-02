import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleRTL, toggleTheme, toggleSidebar } from '../../store/themeConfigSlice';
import { IRootState } from '../../store'; // assuming IRootState is your root state interface
import IconSun from '../Icon/IconSun'; // assuming the correct path to IconSun component
import IconMoon from '../Icon/IconMoon'; // assuming the correct path to IconMoon component
import IconLaptop from '../Icon/IconLaptop'; // assuming the correct path to IconLaptop component

const ThemeToggler: React.FC = () => {
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const dispatch = useDispatch();

  return (
    <div>
      {themeConfig.theme === 'light' && (
        <button
          className="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
          onClick={() => {
            dispatch(toggleTheme('dark'));
          }}
        >
          <IconSun />
        </button>
      )}
      {themeConfig.theme === 'dark' && (
        <button
          className="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
          onClick={() => {
            dispatch(toggleTheme('system'));
          }}
        >
          <IconMoon />
        </button>
      )}
      {themeConfig.theme === 'system' && (
        <button
          className="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
          onClick={() => {
            dispatch(toggleTheme('light'));
          }}
        >
          <IconLaptop />
        </button>
      )}
    </div>
  );
};

export default ThemeToggler;
