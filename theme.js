import { Platform, Appearance } from 'react-native';
//import getTheme from 'react-native-material-ui';

// Define the light theme object
const lightTheme = {
  palette: {
    primaryColor: '#2196F3',
    accentColor: '#eb9409',
    primaryTextColor: '#212121',
    secondaryTextColor: '#eb9409',
    dividerColor: '#BDBDBD',
    backgroundColor: '#F5F5F5',
  },
  typography: {
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
    fontSize: 16,
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
};

// Define the dark theme object
const darkTheme = {
  palette: {
    primaryColor: '#BB86FC',
    accentColor: '#03DAC6',
    primaryTextColor: '#FFFFFF',
    secondaryTextColor: '#EEEEEE',
    dividerColor: '#666666',
    backgroundColor: '#121212',
  },
  typography: {
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
    fontSize: 16,
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
};

// Determine the current mode (light or dark)
const currentMode = Appearance.getColorScheme();

// Export the appropriate theme object based on the current mode
const theme = (currentMode === 'dark' ? darkTheme : lightTheme) 
export default theme
