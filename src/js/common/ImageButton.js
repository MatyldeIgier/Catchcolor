import React, {Component} from "react";
import {View, TouchableOpacity, Image} from "react-native";

class ImageButton extends Component {
    render() {
        return(
            <TouchableOpacity onPress={this.props.onPress}>
                <Image style={this.props.imageStyle} source={this.props.image}/>
            </TouchableOpacity>
        );
    }
}

export default ImageButton;