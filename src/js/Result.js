import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity} from 'react-native';
import {Button} from "./common";
import HomeIcon from "../assets/Graphics/HomeIcon.png";

const ImageCadre = ({source, score}) => (
    <View>
        <ImageBackground source={source} style={styles.image}>
            <View style={styles.textImageContainer}>
                <Text style={styles.textImage}>{score}</Text>
            </View>
        </ImageBackground>
    </View>
);

class Result extends Component {
    static navigationOptions = {
        headerStyle: {
            display: 'none'
        }
    };
    render ( ) {
        return (
            <ImageBackground source={require('../assets/BackgroundPlay.png')} style={{width: '100%', height: '100%'}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                    <Image source={HomeIcon} style={styles.homeButton}/>
                </TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.scoreContainer}>
                        <Image source={require('../assets/Trophy.png')}/>
                        <Text style={styles.score}>1369</Text>
                    </View>
                    <View>
                        <View style={styles.imagesLineContainer}>
                            <ImageCadre source={require('../assets/ImageTest.png')} score={1023}/>
                            <ImageCadre source={require('../assets/ImageTest.png')} score={36}/>
                        </View>
                        <View style={styles.imagesLineContainer}>
                            <ImageCadre source={require('../assets/ImageTest.png')} score={305}/>
                            <ImageCadre source={require('../assets/ImageTest.png')} score={5}/>
                        </View>
                    </View>
                    <Button onPress={() => this.props.navigation.navigate('Play')}>Play</Button>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 9,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    text: {
        color: "#073B4C",
        fontSize: 30,
        textAlign: "center",
        fontWeight: "500"
    },
    score: {
        fontSize: 40,
        color: "#06D6A0",
        fontWeight: "500",
        marginLeft: 15
    },
    scoreContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    imagesLineContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10
    },
    image: {
        marginLeft: 10,
        marginRight: 10,
        minWidth: 138,
        minHeight: 152,
        justifyContent: "flex-end",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 5,
        borderColor: '#118AB2'
    },
    textImageContainer: {
        backgroundColor: "#073B4C",
        opacity: 0.9,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#073B4C'
    },
    textImage: {
        color: "#FFFCF2",
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 10,
        marginRight: 10
    },
    homeButton: {
        width: 25,
        height: 25,
        marginTop: 30,
        marginLeft: 15,
        tintColor: "#073B4C"
    }
});

export default Result;