import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import ImageButton from "./common/ImageButton";
import camera from "../assets/Camera.png";

class Play extends Component {
    static navigationOptions = {
        headerStyle: {
            display: 'none'
        }
    };
    render ( ) {
        return (
            <ImageBackground source={require('../assets/BackgroundPlay.png')} style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>
                    <Text style={styles.text}>Take 4 pictures {"\n"} which contain the {"\n"} following colour</Text>
                    <Image source={require('../assets/color.png')}/>
                    <ImageButton image={camera} onPress={() => this.props.navigation.navigate("CameraScreen")}/>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 9,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    text: {
        color: "#073B4C",
        fontSize: 30,
        textAlign: "center",
        fontWeight: "500"
    }
});

export default Play;