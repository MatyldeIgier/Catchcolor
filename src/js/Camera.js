import React, {Component} from "react";
import {View, Text, Dimensions, TouchableOpacity, StyleSheet, Image} from "react-native";
import {RNCamera} from 'react-native-camera';
import ImageButton from './common/ImageButton';
import camera from "../assets/Camera.png";

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
            console.log(data.uri);
        }
        const nbPictures = this.state.nbPictures + 1;
        this.setState ({
            nbPictures
        });
        if (nbPictures > 3) {
            this.props.navigation.navigate("Result");
        }
    };

    render() {

        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../assets/color.png')} style={styles.colorImage}/>
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
        alignItems: "center"
    },
    colorImage: {
        width: 161,
        height: 37
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
    }
});

export default CameraScreen;