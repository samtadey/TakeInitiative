import React from 'react';
import { View, Platform, Text, StyleSheet} from 'react-native';
import { Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import strings from '../constants/Strings'
import CreateEncounterModal from '../components/CreateEncounterModal';
import AddUnitModal from '../components/AddUnitModal';

class InitiativeActionsDrawer extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Button light full style={styles.spacing} onPress={() => this.props.advance_list()}>
                    <Text>{strings.drawer.initDrawerAdvance}</Text>
                </Button>

                <AddUnitModal add_unit={this.props.add_unit}/>

                {/* <Button light full style={styles.spacing}>
                    <Text>{strings.drawer.initDrawerRemove}</Text>
                </Button> */}

                <View style={styles.bottom}>
                    <CreateEncounterModal generate_list={this.props.generate_list}/>
                    <Button danger full style={styles.spacing} onPress={() => this.props.clear_list()}>
                        <Text style={{color: 'white'}}>{strings.drawer.initDrawerClear}</Text>
                    </Button>
                </View>
          </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: 'flex-end'
    },
    spacing: {
        marginBottom: 10,
        borderRadius: 5,
    },
});



export default withNavigation(InitiativeActionsDrawer)
