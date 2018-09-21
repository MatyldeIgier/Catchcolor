import React, {Component} from "react";
import {connect} from "react-redux";
import {Colors} from "./constants/colors";
import {View, Text, Dimensions, TouchableOpacity, StyleSheet, Image} from "react-native";
import {RNCamera} from 'react-native-camera';
import ImageButton from './common/ImageButton';
import camera from "../assets/Camera.png";
import ArrowLeft from "../assets/Graphics/ArrowLeft.png"

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

    takePicture = async function() {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            console.log("data camera",data);
        }
        const nbPictures = this.state.nbPictures + 1;
        this.setState ({
            nbPictures
        });
        if (nbPictures > 3) {
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
        currentColor : state.currentColor
    }
}

export default connect(mapStateToProps,null)(CameraScreen);