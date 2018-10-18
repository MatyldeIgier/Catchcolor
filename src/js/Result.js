import React, {Component} from 'react';
import {connect} from "react-redux";
import RNFS from "react-native-fs";
import PixelColor from 'react-native-pixel-color';
import {StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity} from 'react-native';
import {Button} from "./common";
import HomeIcon from "../assets/Graphics/HomeIcon.png";
import {Colors} from "./constants/colors";
import * as actions from "../actions";

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
            loading: 4
        }
    }

    static navigationOptions = {
        headerStyle: {
            display: 'none'
        }
    };

    deleteDataCache = (path) => {
        return RNFS.unlink(path)
            .then(() => {
                console.log('FILE DELETED: ',path);
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch((err) => {
                console.log(err.message);
            });
    }

    deleteCache = () => {
        this.props.pictures.map (picture => {
            this.deleteDataCache(picture.pictureURI);
        })
    }

    // componentDidMount () {
    //     let currentScore = null;
    //     this.props.pictures.map((picture) => {
    //             currentScore = this.computeScore(picture.pictureURI, Colors[this.props.currentColor].color);
    //             this.props.setPictureScore(picture.id, currentScore);
    //             this.setState({
    //                 loading: this.state.loading -1
    //             })
    //         }
    //     )
    // }

    render () {
        return (
            <ImageBackground source={require('../assets/BackgroundPlay.png')} style={{width: '100%', height: '100%'}}>
                    <TouchableOpacity onPress={() => {
                        this.deleteCache();
                        this.props.navigation.navigate("Home")
                    }
                    }
                    >
                        <Image source={HomeIcon} style={styles.homeButton}/>
                    </TouchableOpacity>
                    <View style={styles.container}>
                        <View style={styles.scoreContainer}>
                            <Image source={require('../assets/Trophy.png')}/>
                            <Text style={styles.score}>1369</Text>
                        </View>
                        <View style={styles.imagesLineContainer}>
                            {this.props.pictures.map(picture =>
                                <ImageCadre key={picture.id} source={{uri: picture.pictureURI}} score={102}/>
                            )}
                        </View>
                        <Button onPress={() => {
                            this.deleteCache();
                            this.props.navigation.navigate('Play')
                            }
                        }
                        >Play</Button>
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
        marginTop: 30,
        marginLeft: 15,
        tintColor: "#073B4C"
    }
});

const mapStateToProps = state => {
    return {
        currentColor : state.currentColor,
        pictures : state.pictures
    }
}

export default connect(mapStateToProps,actions)(Result);