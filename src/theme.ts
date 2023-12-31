import { ThemeOptions, createTheme } from '@mui/material/styles';
import { dark, light } from '@mui/material/styles/createPalette';

const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false;

console.log('Dark Mode: ', darkMode);

const theme: ThemeOptions = createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light', // dynamically determine mode
    primary: {
      main: '#ff6f61',
    },
    secondary: {
      main: '#5e35b1',
    },
    background: {
      default: darkMode ? '#282828' : '#ffffff'
    },
    text: {
      primary: darkMode ? '#ffffff' : '#000000',
      secondary: darkMode ? '#dddddd' : '#555555',
    },
  },
});

export default theme;