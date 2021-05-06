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
         buttonstate: 'normal'
     }
 }
 getCameraPermissions = async()=>{
     const {status} = await Permissions.askAsync(Permissions.CAMERA);
     this.setState({
         hasCameraPermissions : status ==='granted',
         buttonstate:'clicked',
         scanned: false
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
     const hasCameraPermissions = this.state.hasCameraPermissions;
     const scanned = this.state.scanned;  
     const buttonstate = this.state.buttonstate;  
    if(buttonstate === 'clicked' && hasCameraPermissions){
        return(
            <BarCodeScanner onBarCodeScanned ={scanned ? undefined : this.handleBarCodeScanned}
            style = {StyleSheet.absoluteFillObject}
            />                
        )        
         }else if (buttonstate === "normal"){
            return(
                <View>
                    <Image
                     source={require("../assets/camera.jpg")}
                     style={{width:150, height: 150,marginTop : 150,marginLeft:110}}/>
                    <Text style = {{fontWeight: 'bold',fontSize:30,marginLeft:80}}>Bar Code Scanner</Text> 
                    <Text style = {{fontSize:15,marginLeft : 105}}>{hasCameraPermissions === true ? this.state.scannedData : "Request Camera Permissions"}
                    </Text>         
                    <TouchableOpacity
                    onPress ={this.getCameraPermissions}
                    style = {{marginLeft:140,marginRight:100,marginTop:10,width:150,borderRadius:20,borderWidth:3,alignContent:'center',backgroundColor:'#939393'}}>                    
                    <Text style = {{alignSelf:'center'}}>Scan QR Code</Text>
                    </TouchableOpacity>                                       
                </View>
            )
         }
     
 }
}