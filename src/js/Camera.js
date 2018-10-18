import React, {Component} from "react";
import {connect} from "react-redux";
import PixelColor from 'react-native-pixel-color';
import {View, Text, Dimensions, TouchableOpacity, StyleSheet, Image, WebView} from "react-native";
import {RNCamera} from 'react-native-camera';

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

    isSimilarHexa = (hex1, hex2, ratio) => {
        // get red/green/blue int values of hex1
        const r1 = parseInt(hex1.substring(0, 2), 16);
        const g1 = parseInt(hex1.substring(2, 4), 16);
        const b1 = parseInt(hex1.substring(4, 6), 16);
        // get red/green/blue int values of hex2
        const r2 = parseInt(hex2.substring(0, 2), 16);
        const g2 = parseInt(hex2.substring(2, 4), 16);
        const b2 = parseInt(hex2.substring(4, 6), 16);
        // calculate differences between reds, greens and blues
        let r = 255 - Math.abs(r1 - r2);
        let g = 255 - Math.abs(g1 - g2);
        let b = 255 - Math.abs(b1 - b2);
        // limit differences between 0 and 1
        r /= 255;
        g /= 255;
        b /= 255;
        // 0 means opposit colors, 1 means same colors
        let ratioSimilar = (r + g + b) / 3;
        return (ratioSimilar > ratio);
    }

    computeScore = (imageURI, colorImage,pictureId) => {
        //setTimeout(() => {
            Image.getSize(imageURI, (width, height) => {
                let score = 0;
                let x;
                let y;
                for (x = 0; x < width; x=x+10) {
                    for(y=0; y<height; y=y+10) {
                        PixelColor.getHex(imageURI, { x, y }).then((color) => {
                            if (this.isSimilarHexa(colorImage,color,0.8)) {
                                score++;
                            }
                        })
                    }
                }
                this.props.setPictureScore(pictureId, score);
                if (pictureId > 2) {
                    this.props.navigation.navigate("Result");
                }
            });
        //})
    }

    takePicture = async function() {
        let data;
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            data = await this.camera.takePictureAsync(options)
            this.props.setPictureAction(this.state.nbPictures,data.uri);
        }
        const nbPictures = this.state.nbPictures + 1;
        this.setState ({
            nbPictures
        });
        if (nbPictures > 3) {
             let currentScore = null;
             await this.props.pictures.map((picture) => {
                     currentScore = this.computeScore(picture.pictureURI, Colors[this.props.currentColor].color,picture.id);
                 }
             )
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
                    flashMode={RNCamera.Constants.FlashMode.on}
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
        width: 73,
        height: 60,
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