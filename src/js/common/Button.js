import React from 'react';
import {Text,TouchableOpacity} from 'react-native';

function Button(props){
    return (
        <TouchableOpacity
            style={styles.buttonStyle}
            onPress={props.onPress}
            disabled={props.disabled}
        >
            <Text style={styles.textStyle}>{props.children}</Text>
        </TouchableOpacity>
    );
}

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#FFFCF2',
        fontSize: 30,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },

    buttonStyle: {
        //alignSelf: 'stretch',
        backgroundColor: '#FFD166',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#FFD166',
        marginLeft: 5,
        marginRight: 5,
        paddingLeft: 40,
        paddingRight: 40
    }
}

export {Button} ;