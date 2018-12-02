import React, {Component} from 'react';
import {connect} from "react-redux";
import RNFS from "react-native-fs";
import PixelColor from 'react-native-pixel-color';
import {StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ActivityIndicator, AsyncStorage} from 'react-native';
import {Button} from "./common";
import HomeIcon from "../assets/Graphics/HomeIcon.png";
import {Colors} from "./constants/colors";
import * as actions from "../actions";

import ColorPixels from "../NativeModules/ColorPixels";

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
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            currentScoreTotal: 0,
            best: false,
            computeScore: true
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

    computeScore = async (imageURI, colorImage,pictureId) => {
            let score = 0;
            const colorR = parseInt(colorImage.substring(1, 3), 16);
            const colorG = parseInt(colorImage.substring(3, 5), 16);
            const colorB = parseInt(colorImage.substring(5, 7), 16);
            const promiseColors = await new Promise((resolve,reject) => {
                ColorPixels.getPixelColorHex(imageURI, colorR, colorG, colorB, function(res) {
                    let colorsRes = res.colors;
                    resolve(colorsRes)
                }); 
            }); 
            /* for(let color of promiseColors) {
                if(this.isSimilarHexa(colorImage,color,0.8)) {
                    score++;
                }
            } */ 
            return promiseColors;
    }

    algo = async () => {
            let currentScoreTotal = 0;
             for(let picture of this.props.pictures) {
                const currentScore = await this.computeScore(picture.pictureURI, Colors[this.props.currentColor].color, picture.id);
                console.log("currentscore",picture.id,currentScore);
                this.props.setPictureScore(picture.id, currentScore);
                currentScoreTotal = currentScoreTotal + currentScore;
            } 
            if (currentScoreTotal > this.props.maxScore.maxScore) {
                this.props.setMaxScore(currentScoreTotal)
                AsyncStorage.setItem('maxScore',''+currentScoreTotal);
                this.setState({best: true})
            }
            return await this.setState({
                currentScoreTotal,
                loading: false,
                computeScore: false
            })  
        
    }

    generateRandomNumber = () => {
        return Math.floor(0 + Math.random() * 10);
    }

    _onPress = () => {
        const random = this.generateRandomNumber();
        this.props.setCurrentColor(random);
        this.props.navigation.navigate('Play')
    }

     componentDidMount () {
         let currentScore = null;
       setTimeout(()=> {
        new Promise.resolve().then( () => {
            return this.algo();
         })
       },400)
         }

    render () {
        return (
            <ImageBackground source={require('../assets/BackgroundPlay.png')} style={{width: '100%', height: '100%'}}>
                    <TouchableOpacity style={styles.buttonLeft} onPress={() => {
                        this.props.navigation.navigate("Home")
                    }
                    }
                    >
                        <Image source={HomeIcon} style={styles.homeButton}/>
                    </TouchableOpacity>
                    <View style={styles.container}>
                        <View style={styles.resultContainer}>
                            <Image source={require('../assets/Paint.png')} style={[styles.colorImage, {tintColor : Colors[this.props.currentColor].color}]}/>
                            {this.state.loading === true 
                                ?   <ActivityIndicator size="large" color="#0000ff" />
                                :   <View style={styles.scoreContainer}>
                                        <View style={styles.trophyContainer}>
                                            <Image source={require('../assets/Trophy.png')}/>
                                            {this.state.best 
                                                ? <Text style={styles.best}>BEST</Text>
                                                : null
                                            }
                                        </View>
                                        <Text style={styles.score}>{this.state.currentScoreTotal}</Text>
                                    </View>
                            }
                        </View>
                        <View style={styles.imagesLineContainer}>
                            {this.props.pictures.map(picture =>
                                <ImageCadre key={picture.id} resizeMethod={"resize"} source={{uri: picture.pictureURI}} score={picture.score !== null ? picture.score : "..."}/>
                            )}
                        </View>
                        <Button onPress={() => this._onPress()} disabled={this.state.computeScore}>Play</Button>
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
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        marginBottom: 10,
        marginTop: 10
    },
    image: {
        marginTop: 10,
        marginBottom: 10,
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
        tintColor: "#073B4C"
    },
    buttonLeft: {
        width: 25,
        height: 25,
        marginTop: 30,
        marginLeft: 15,
    },
    colorImage: {
        width: 70,
        height: 70,
        marginRight: 30
    },
    resultContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trophyContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    best: {
        fontSize: 18,
        color: '#FFD166',
        fontWeight: 'bold'
    }
});

const mapStateToProps = state => {
    return {
        currentColor : state.currentColor,
        pictures : state.pictures,
        maxScore : state.maxScore
    }
}

export default connect(mapStateToProps,actions)(Result);