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

export default class ThemeItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: styles,
        }

        setGlobalTheme = async (theme) => {
            await AsyncStorage.setItem(strings.keys.theme, JSON.stringify(theme))
            .then(json => alert("Pass"))
            .catch(error => alert("Fail"));
        }
    }

    componentDidMount() {
        //set dynamic theme
        const new_style = StyleSheet.create({
            adventurer_container: {
                padding: 5,
                borderRadius: 5, 
                borderColor: this.props.my_style.border ? this.props.my_style.border : '#FFF', 
                borderWidth: 5,
                height: 50, 
                marginBottom: 10,
                justifyContent: 'center',
                backgroundColor: this.props.my_style.background ? this.props.my_style.background : '#FFF',
            },
        });
        this.setState({theme: new_style});
    }

    render() {
        return (
            <TouchableOpacity onPress={() => {setGlobalTheme(this.props.my_style)}}>
                <View style={this.state.theme.adventurer_container}>
                </View>
            </TouchableOpacity>
        );
    }
}

//default
const styles = StyleSheet.create({
    adventurer_container: {
        padding: 5,
        borderRadius: 5, 
        //borderColor: '#7D7D7D',
        borderColor: '#FFF', 
        borderWidth: 5,
        height: 50, 
        marginBottom: 10,
        justifyContent: 'center',
        //backgroundColor: '#F8F8F8',
        backgroundColor: '#FFF',
    },
});

