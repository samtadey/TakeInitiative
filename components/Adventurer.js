import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class Adventurer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        test = this.props.image;
        return (
            <View style={styles.adventurer_container}>
              <View style={styles.flexrow}>
                <View style={styles.image_left}>
                  <Image style={styles.photo} source={this.props.image}/>
                </View>
                <View style={styles.adventurer_container_text}>
                  <View style={styles.flexrow}>
                    <Text style={styles.classifier}>Name: </Text>
                    <Text>{this.props.name}</Text>
                  </View>
                  <View style={styles.flexrow}>
                    <Text style={styles.classifier}>Class: </Text>
                    <Text>{this.props.adv_class}</Text>
                  </View>
                  <View style={styles.flexrow}>
                    <Text style={styles.classifier}>Race: </Text>
                    <Text>{this.props.race}</Text>
                  </View>
                </View>
                <View style={styles.image_right}>
                  <Image style={styles.photo} source={require('../assets/character_icons/death.png')}/>
                </View>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    adventurer_container: {
        padding: 5,
        borderRadius: 5, 
        borderColor: '#7D7D7D', 
        borderWidth: 5,
        height: 100, 
        marginBottom: 10,
        justifyContent: 'center',
        backgroundColor: '#F8F8F8',
    },
    adventurer_container_text: {
        display: 'flex',
        flex: 2,
        justifyContent: 'center'
    },
    image_left: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    image_right: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    photo: {
        height: 75,
        width: 75,
    },
    flexrow: {
        flexDirection: 'row',
        display: 'flex',
    },
    classifier: {
        fontSize: 14,
        fontWeight: 'bold',
    }
});

