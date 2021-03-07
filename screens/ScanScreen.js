import React, { Component } from 'react';
import { View, StyleSheet, Text ,TouchableOpacity,Image, Touchable } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner, barCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
 constructor(){
     super();
     this.state = {
         hasCameraPermissions : null,
         scanned: false,
         scannedData : '',
         buttonState: 'normal'
     }
 }
 getCameraPermissions = async()=>{
     const {status} = await Permissions.askAsync(Permissions.CAMERA);
     this.state({
         hasCameraPermissions : status ==='granted'
     });
 }
 handleBarCodeScanned = async({type,data})=>{
     this.setState({
         scanned: true,
         scannedData: data,
         buttonstate: 'normal'
     })
 }
 render(){    
    if(this.state.buttonState !== 'normal' && HasCameraPermissions){
        return(
            <BarCodeScanner onBarCodeScanned ={Scanned ? undefined : this.handleBarCodeScanned}>                
            </BarCodeScanner>
        )  
         }else if (this.state.buttonState === "normal"){
            <Text>This is the Scanning Page</Text>
         }
         <TouchableOpacity
         onPress ={this.getCameraPermissions}
         title = "Bar Code Scanner">
        <Text>Scan QR Code</Text>
         </TouchableOpacity>
     
 }
}