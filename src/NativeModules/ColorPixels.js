//var ReactNative = require('react-native');
//console.dir(ReactNative.NativeModules.CalendarManager); 
import { NativeModules, NativeEventEmitter } from 'react-native'

class ColorPixels extends NativeEventEmitter {
    constructor(nativeModule) {
        super(nativeModule);
        this.getCount = nativeModule.getCount
        this.increment = nativeModule.increment
        this.getPixelColorHex = nativeModule.getPixelColorHex
        this.addEvent = nativeModule.addEvent
    }
} 

export default new ColorPixels(NativeModules.CalendarManager)