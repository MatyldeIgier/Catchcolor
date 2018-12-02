import React, {Component} from "react";
import {connect} from "react-redux";
import PixelColor from 'react-native-pixel-color';
import {View, Text, Dimensions, TouchableOpacity, StyleSheet, Image, WebView} from "react-native";
import {RNCamera} from 'react-native-camera';
var RNFS = require('react-native-fs');
import {Colors} from "./constants/colors";

import ImageButton from './common/ImageButton';
import camera from "../assets/Camera.png";

import ArrowLeft from "../assets/Graphics/ArrowLeft.png"
import * as actions from "../actions";

class CameraScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nbPictures : 0
        }
    }

    static navigationOptions = {
        headerStyle: {
            display: 'none'
        }
    };

/*     deleteDataCache = (path) => {
        return RNFS.unlink(path)
            .then(() => {
                console.log('FILE DELETED: ',path);
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch((err) => {
                console.log(err.message);
            });
    } */
    
    randomString = () => {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 10; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      }

    takePicture = async function() {
        let data;
        var directory = RNFS.DocumentDirectoryPath + '/Pictures/Catchcolor/';
        RNFS.mkdir(directory.toString()).then( console.log(directory) );
        if (this.camera) {
            const options = { quality: 0.3, base64: false };
            data = await this.camera.takePictureAsync(options)
            const picturePath = directory + this.state.nbPictures+ this.randomString()+'.jpg';
            RNFS.moveFile(data.uri.toString(), picturePath);
            //this.deleteDataCache(data.uri);
            //console.log("directory path", picturePath);
            this.props.setPictureAction(this.state.nbPictures,picturePath);
        }
        const nbPictures = this.state.nbPictures + 1;
        this.setState ({
            nbPictures
        });
        if (nbPictures > 3) {
/*              let currentScore = null;
             await this.props.pictures.map((picture) => {
                     currentScore = this.computeScore(picture.pictureURI, Colors[this.props.currentColor].color,picture.id);
                 }
             ) */
             this.props.setPictureScore(0, null);
             this.props.setPictureScore(1, null);
             this.props.setPictureScore(2, null);
             this.props.setPictureScore(3, null);
             
             this.props.navigation.navigate("Result");
        }
    };

    getColor = (i) => {
        if (i>=this.state.nbPictures) {
            return "#073B4C";
        }else return "#06D6A0";
    }


    render() {
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Play")}>
                        <Image source={ArrowLeft} style={styles.backButton}/>
                    </TouchableOpacity>
                    <Image source={require('../assets/Paint.png')} style={[styles.colorImage, {tintColor : Colors[this.props.currentColor].color}]}/>
                    <View style={styles.littleCamera}>
                        <Image source={camera} style={[styles.colorImageCamera, {tintColor : this.getColor(0)}]}/>
                        <Image source={camera} style={[styles.colorImageCamera, {tintColor : this.getColor(1)}]}/>
                        <Image source={camera} style={[styles.colorImageCamera, {tintColor : this.getColor(2)}]}/>
                        <Image source={camera} style={[styles.colorImageCamera, {tintColor : this.getColor(3)}]}/>
                    </View>
                </View>
                <RNCamera
                    ref={cam => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                >
                </RNCamera>
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                    <ImageButton imageStyle={styles.imageStyle} image={camera} onPress={this.takePicture.bind(this)}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "space-around",
        backgroundColor: '#FFFCF2'
    },
    header: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row"
    },
    littleCamera: {
        flexDirection: "row"
    },
    colorImage: {
        width: 70,
        height: 70,
        marginLeft: 30
    },
    colorImageCamera: {
        width: 25,
        height: 19,
        marginLeft: 10,
        marginRight: 10
    },
    preview: {
        flex: 5,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    imageStyle: {
        height: 58,
        width: 77,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    },
    backButton: {
        width: 16,
        height: 30,
        //marginTop: 30,
        marginLeft: -5,
        tintColor: "#073B4C"
    }
});

const mapStateToProps = state => {
    return {
        currentColor : state.currentColor,
        pictures: state.pictures
    }
}

export default connect(mapStateToProps,actions)(CameraScreen);