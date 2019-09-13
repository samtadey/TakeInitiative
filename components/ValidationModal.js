// import React from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import Modal from "react-native-modal";
// import {Button}  from 'native-base';
// import strings from '../constants/Strings';
// import { ScrollView } from 'react-native-gesture-handler';


// export default class ValidationModal extends React.Component {

//   constructor(props){
//     super(props);
//     this.state = {
//       msg : null,
//       CPMmodalvisible: false,
//     };

//     VMopenModal = (msg) => {
//         this.setState({
//           CPMmodalvisible: true,
//           msg: msg,
//         });
//       }

//     VMcloseModal = () => {
//         this.setState({
//             CPMmodalvisible:false,
//             msg: null,
//         });
//     }
//  }

//   render() {
//     return (
//       <View style={styles.container2}>
//         <Modal
//               visible={this.state.CPMmodalvisible}
//               animationType={'slide'}
//               onBackdropPress={() => CPMcloseModal()}
//         >
//         <ScrollView style={styles.modal_container2}>

//             <Text>{this.state}</Text>
        
//             <View style={styles.flexrow}>
//                 <Button danger block style={styles.btn} onPress={() => CPMcloseModal()}>
//                     <Text style={{color:'white'}}>{strings.common_verbs.close}</Text>
//                 </Button>
//                 {/* <Button success block style={styles.btn}>
//                     <Text style={{color:'white'}}>{strings.common_verbs.confirm}</Text>
//                 </Button> */}
//             </View>

//         </ScrollView>
//         </Modal>

//         <Button light block onPress={() => CPMopenModal()} style={styles.b}>
//             <Text>{strings.common_verbs.choose_image}</Text>
//         </Button>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container2: {
//     //flex: 1,
//     //backgroundColor: 'green',
//   },
//   text: {
//       color: 'white',
//   },
//   modal_container2: {
//     backgroundColor: '#FFFFFF',
//     //height: ,
//     padding: 10,
//     borderRadius: 5,
//     borderColor: 'black',
//     borderWidth: 1,
// },
// sel: {
//     // borderRadius: 5,
//     // borderColor: 'black',
//     // borderWidth: 2,
//     //backgroundColor : '#F0F0F0'
// },
// photo: {
//     height: 75,
//     width: 75,
//     //backgroundColor: '#F0F0F0',
// },
//   innerContainer: {
//     alignItems: 'center',
//   },
//   add_button: {
//     borderRadius: 5,
//     flex: 1,
//   },
//   formInput:{
//     borderColor:'#CAECE4',
//     height: 60,       
//   },
//   title: {
//     fontSize: 18, 
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   spacer: {
//     marginBottom: 10,
//   },
//   flexrow : {
//     flexDirection: 'row',
//     display: 'flex',
//     justifyContent: 'center',
//     marginBottom: 10,
//     height: 85,
//     //backgroundColor: 'green'
//   },
//   btn : {
//       flex: 1,
//       marginBottom: 10
//   },
//   b : {
//     marginBottom: 10,
//   },
// })

