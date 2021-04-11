import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state = {
          hasCameraPermissions: null,
          scanned: false,
          scannedData: '',
          buttonState: 'normal'
        }
    }

    getCameraPermissions = async() => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
          hasCameraPermissions: status === 'Granted'
        })
    }
  
    handleBarCodeScanned = async({type,data}) =>{
        this.setState({
          scanned: true,
          scannedData: data,
          buttonState: 'normal'
        })
    }
    
    render() {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scannned;
        const buttonState = this.state.buttonState;
        if (buttonState === "clicked" && hasCameraPermissions){
           return( 
            <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned} 
            style={StyleSheet.absoluteFillObject} /> 
            ); 
        }else if(buttonState === 'normal'){
          return (
            <View style = { styles.container }>
              <Image
              style={{ height:200, width:200, alignSelf:'center', justifyContent:'center' }}
              source={require('../assets/camera.jpg')}
              />
              <Text style = { styles.displayText }>
                {hasCameraPermissions === true ?this.state.scannedData:'Request Camera Permissions'}
              </Text>
              <TouchableOpacity 
                style = { styles.scanButton }
                onPress={
                  this.getCameraPermissions()              
                }
                title = 'Bar Code Scanner'>
                <Text style = {styles.buttonText}>Scan QR Code</Text>
              </TouchableOpacity>
            </View>
          );
        }
    }
}

const styles = StyleSheet.create({
    container:{
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    displayText:{
      fontSize:15,
      textDecorationLine:'underline'
    },
    scanButton:{
      backgroundColor:'#2196f3',
      margin: 10,
      padding: 10
    },
    buttonText:{
      fontSize:20
    }
})