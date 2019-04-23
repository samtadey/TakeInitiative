import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet,  
    TouchableOpacity 
} from 'react-native';

//
//  TODO CHANGE ALL COMPONENTS TO THIS FORMAT
//
export default class PartyListItem extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.memberNo = props.memberNo;
      }

      render () {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate("AdventurerList")}>
                <View style={styles.container}>
                    <View style={styles.container_text}>
                        <Text style={styles.title}>
                            Name: {this.name}
                        </Text>
                        <Text style={styles.player_class}>
                            No. Members: {this.memberNo}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
      }
}


/*const PartyListItem = ({ name, memberNo }) => (
    <TouchableOpacity onPress={() => this.props.navigation.navigate("AdventurerList")}>
        <View style={styles.container}>
            <View style={styles.container_text}>
                <Text style={styles.title}>
                    Name: {name}
                </Text>
                <Text style={styles.player_class}>
                    No. Members: {memberNo}
                </Text>
            </View>
        </View>
    </TouchableOpacity>
);
}*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#add8e6',
        elevation: 2,
    },
    title: {
        fontSize: 16,
        color: '#000',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    initiative: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    player_class: {
      fontSize: 14,
      fontStyle: 'italic',
    },
    photo: {
        height: 50,
        width: 50,
    },
});