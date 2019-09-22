import React from 'react';

export const 
    themes = [
        {name: 'grey', borderColor: '#7D7D7D', backgroundColor: '#F8F8F8'},
        {name: 'red', borderColor: '#eb0000', backgroundColor: '#ffebeb'},
        {name: 'orange', borderColor: '#ffa500', backgroundColor: '#fff8eb'},
        {name: 'yellow', borderColor: '#d8d800', backgroundColor: '#ffffeb'},
        {name: 'green', borderColor: '#007600', backgroundColor: '#ebffeb'},
        {name: 'blue', borderColor: '#1414ff', backgroundColor: '#ebebff'},
        {name: 'dark_blue', borderColor: '#0000b1', backgroundColor: '#ebebff'},
        {name: 'purple', borderColor: '#8346c1', backgroundColor: '#efe7f7'},
        {name: 'pink', borderColor: '#ff99ab', backgroundColor: '#ffe7eb'},
        {name: 'mahogany', borderColor: '#990000', backgroundColor: '#ffebeb'},
        {name: 'brown', borderColor: '#8b4513', backgroundColor: '#fdf5ef'},
        {name: 'black', borderColor: '#000000', backgroundColor: '#FFFFFF'},
    ];


export const ThemeContext = React.createContext({
    theme: themes[1], // default value
    setTheme: () => {},
});