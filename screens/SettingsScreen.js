import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import ThemeItem from '../components/ThemeItem'
import strings from '../constants/Strings'
import theme from '../constants/Themes'



export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Settings",
  })

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>{strings.settings.themes_title}</Text>
          {theme.themes.map(function(listitem, index){
            return(
                <ThemeItem 
                  key={index}
                  my_style={listitem}
                />)
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title : {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});

