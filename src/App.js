import React from "react";
import {createStackNavigator} from 'react-navigation';
import HomeScreen from "./js/Home";
import Play from "./js/Play";
import CameraScreen from "./js/Camera";
import Result from "./js/Result";

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