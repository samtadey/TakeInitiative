import React from 'react';
import themes from '../constants/Themes';

export const ThemeContext = React.createContext();
export const ThemeConsumer = ThemeContext.Consumer;

export default class ThemeProvider extends React.Component {
  state = {theme: themes.theme[1]};

  updateTheme = e => this.setState({ theme: e.target.value });

  render() {
    return (
      //value props are passed to all consumers?
      <ThemeContext.Provider value={{
        theme: this.state.theme,
        updateTheme: this.updateTheme
      }}>
        {this.props.children}
      </ThemeContext.Provider>
  );}
}