const colors = {
    grey: (opacity = 1) => `rgba(109, 125, 154, ${opacity})`,
    blue: (opacity = 1) => `rgba(53, 88, 225, ${opacity})`,
    white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    darkModeBlack: (opacity = 1) => `rgba(27, 27, 27, ${opacity})`,
    darkModeBlue: (opacity = 1) => `rgba(146, 156, 241, ${opacity})`,

    // Tambahkan ini
    blueLight: (opacity = 1) => `rgba(173, 202, 255, ${opacity})`, // Light Blue
    blueDark: (opacity = 1) => `rgba(25, 46, 99, ${opacity})`,     // Dark Blue
    green: '#4CAF50', // Contoh nilai hex
    greenDark: '#388E3C',
    red: '#F44336',
    redDark: '#D32F2F',
  };

  export default colors;
