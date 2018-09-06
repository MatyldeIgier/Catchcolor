import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import {Button} from "./common";

class Home extends Component {
    static navigationOptions = {
        headerStyle: {
            display: 'none'
        }
    };
    render ( ) {
        return (
            <ImageBackground source={require('../assets/BackgroundHome.png')} style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>
                    <Text style={styles.nameApp}><Text style={styles.yellow}>Catch</Text><Text style={styles.green}>Color</Text></Text>
                    <Image style={styles.logo} source={require('../assets/catchColor.png')} />
                    <View style={styles.scoreContainer}>
                        <Image source={require('../assets/Trophy.png')}/>
                        <Text style={styles.score}>1078</Text>
                    </View>
                    <Button onPress={() => this.props.navigation.navigate('Play')}>Play</Button>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#118AB2',
    },
    nameApp: {
        fontSize: 40,
        marginBottom: 15,
        fontWeight: 'bold'
        //fontFamily: 'SF Pro Text Regular'
    },
    yellow: {
        color: "#FFD166"
    },
    green: {
        color: "#06D6A0"
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 90
    },
    score: {
        fontSize: 40,
        color: "#06D6A0",
        fontWeight: "500",
        marginBottom: 145,
        marginLeft: 15
    },
    scoreContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

export default Home;