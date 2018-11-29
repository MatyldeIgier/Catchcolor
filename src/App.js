import React from "react";


import {createStackNavigator} from 'react-navigation';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import HomeScreen from "./js/Home";
import Play from "./js/Play";
import CameraScreen from "./js/Camera";
import Result from "./js/Result";

import ColorPixels from "../src/NativeModules/ColorPixels"
/* ColorPixels.increment() */
/* ColorPixels.getCount((first, ...others) => {
    console.log("count is ", first)
    console.log("other arguments ", others)
  }) */
/*  ColorPixels.getPixelColorHex("file:///Users/mathildeigier/Library/Developer/CoreSimulator/Devices/FFCEF258-88E7-4734-8C83-C39799D4D343", function(res) {
    console.log("In Callback");
    console.log(res);
});  */
/* ColorPixels.addEvent("One", "Two", 3, function(o) {
    console.log("In Callback");
    console.dir(o);
}); */


const App = createStackNavigator(
    {
        Home: { screen: HomeScreen },
        Play: { screen: Play },
        CameraScreen: { screen: CameraScreen},
        Result: { screen: Result}
    }//,
     //   { headerMode: 'screen' }
    );

export default App;

