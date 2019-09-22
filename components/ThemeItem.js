import React from 'react';
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    TouchableOpacity,
    AsyncStorage, 
} from 'react-native';
import strings from '../constants/Strings';
import {ThemeContext} from '../constants/Themes'

export default class ThemeItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {({changeTheme}) => (
                    <TouchableOpacity onPress={() => {changeTheme(this.props.my_style)}}>
                        <View style={[styles.adventurer_container, this.props.my_style]}>
                        </View>
                    </TouchableOpacity>
                )}
            </ThemeContext.Consumer>
        );
    }
}

//default
const styles = StyleSheet.create({
    adventurer_container: {
        padding: 5,
        borderRadius: 5, 
        borderColor: '#7D7D7D',
        borderWidth: 5,
        height: 50, 
        marginBottom: 10,
        justifyContent: 'center',
        backgroundColor: '#F8F8F8',
    },
});

