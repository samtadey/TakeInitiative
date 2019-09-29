import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Modal from "react-native-modal";
import {Button}  from 'native-base';
import strings from '../constants/Strings';
import ModalSelector from 'react-native-modal-selector';


export default class RemoveUnitModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      RUMmodalvisible: false,
      avail_remove_list: [],
      choice_index: -1,
      msg: '',
    };

    RUMopenModal = () => {
        this.setState({
          RUMmodalvisible: true,
          avail_remove_list: initInitiativeList(this.props.list),
          choice_index: -1,
        });
      }

    RUMcloseModal = () => {
        this.setState({
          RUMmodalvisible:false,
          choice_index: -1,
          msg: '',
        });
    }

    initInitiativeList = (list) => {
        if (list.length > 1)
        {
            let prepared_list = [];
            for (let i = 0; i < list.length; i++)
              prepared_list.push({key: i, label: list[i].name});
            return prepared_list;
        }
        return [];
    }

    handleRemoveUnit = (index) => {
      if (index >= 0)
      {
        this.props.remove_unit(index);
        RUMcloseModal();
      }
      else
      {
        this.setState({msg: strings.validation_msg.remove_unit})
      }

    }
  }

    componentDidMount() {
        initInitiativeList(this.props.list);
    }

    componentDidUpdate(prevProps) {
        if (this.props.list !== prevProps.list)
            this.setState({avail_remove_list: initInitiativeList(this.props.list)});
    }


  render() {
    return (
      <View style={styles.container}>
        <Modal
              visible={this.state.RUMmodalvisible}
              animationType={'slide'}
              onBackdropPress={() => RUMcloseModal()}
        >
        <View style={styles.modal_container}>

            <Text style={styles.title}>{strings.drawer.initDrawerRemove}</Text>

            <ModalSelector
            data={this.state.avail_remove_list}
            style={styles.spacer}
            initValue="Choose to Remove"
            onChange={(option)=>{ this.setState({choice_index: option.key, msg: ''}) }} 
            />

            <View style={styles.validation_text}>
              <Text style={styles.danger}>{this.state.msg}</Text>
            </View>

            <View style={styles.flexrow}>
                <Button danger block style={styles.btn} onPress={() => RUMcloseModal()}>
                    <Text style={{color:'white'}}>Close</Text>
                </Button>
                <Button success block style={styles.btn} onPress={() => handleRemoveUnit(this.state.choice_index)}>
                    <Text style={{color:'white'}}>Confirm</Text>
                </Button>
            </View>


        </View>
        </Modal>

        <Button light block onPress={() => RUMopenModal()} style={styles.add_button}>
            <Text>{strings.drawer.initDrawerRemove}</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: 'green',
  },
  danger: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
  },
  validation_text: {
      marginTop: 5,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center'
  },
  modal_container: {
    backgroundColor: '#FFFFFF',
    //height: ,
    padding: 10,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
},
  innerContainer: {
    alignItems: 'center',
  },
  add_button: {
    borderRadius: 5,
    marginBottom: 10,
  },
  formInput:{
    borderColor:'#CAECE4',
    height: 60,       
  },
  title: {
    fontSize: 18, 
    fontWeight: 'bold',
    marginBottom: 10,
  },
  spacer: {
    marginBottom: 10,
  },
  flexrow : {
    flexDirection: 'row',
    display: 'flex',
  },
  btn : {
      flex: 1
  },
})

