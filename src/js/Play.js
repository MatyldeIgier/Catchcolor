import React, {Component} from 'react';
import {connect} from "react-redux";
import {Colors} from "./constants/colors";
import {StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity} from 'react-native';
import ImageButton from "./common/ImageButton";
import camera from "../assets/Camera.png";
import arrowLeft from "../assets/Graphics/ArrowLeft.png";

class Play extends Component {
    static navigationOptions = {
        headerStyle: {
            display: 'none'
        }
    };
    render ( ) {
        return (
            <ImageBackground source={require('../assets/BackgroundPlay.png')} style={{width: '100%', height: '100%'}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                    <Image source={arrowLeft} style={styles.backButton}/>
                </TouchableOpacity>
                <View style={styles.container}>
                    <Text style={styles.text}>Take 4 pictures {"\n"} which contain the {"\n"} following colour</Text>
                    <Image source={require('../assets/Paint.png')} style={{tintColor : Colors[this.props.currentColor].color, marginTop: -20}}/>
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
        marginTop: -60
    },
    text: {
        color: "#073B4C",
        fontSize: 30,
        textAlign: "center",
        fontWeight: "500"
    },
    backButton: {
        width: 16,
        height: 30,
        marginTop: 30,
        marginLeft: 15,
        tintColor: "#073B4C"
    }
});

const mapStateToProps = state => {
    return {
        currentColor : state.currentColor
    }
}

export default connect(mapStateToProps, null)(Play);