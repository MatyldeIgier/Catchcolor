//
//  Counter.swift
//  catchacolor
//
//  Created by Mathilde Igier on 20.10.18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

@objc(CalendarManager)
class CalendarManager: NSObject {
  
  var bridge: RCTBridge!
  
  @objc func addEvent(_ name: String, location: String, date: NSNumber, callback: RCTResponseSenderBlock ) -> Void {
    // Date is ready to use!
    NSLog("%@ %@ %@", name, location, date)
    callback( [[
      "name": name,
      "location": location,
      "date" : date
      ]])
  }
  
  private var count = 0
  
  @objc
  func increment() {
    count += 1
    print("count is \(count)")
  }
  
  @objc
  func getCount(_ callback: RCTResponseSenderBlock) {
    callback([
      count,
      [1, 2.5, "3"]
      ])
  }
  
  @objc
  func constantsToExport() -> [AnyHashable: Any]! {
    return [
      "number": 1515.15,
      "string": "foo",
      "boolean": true,
      "array": [1, 22.5, "33"],
      "object": ["a": 1, "b": 2]
    ]
  }
  
  //infix operator ^^ { }
  //func ^^ (radix: Double, power: Double) -> Double {
  //  return Double(pow(Double(radix), Double(power)))
  //}
  
  //Based on https://github.com/d3/d3-color/blob/master/src/lab.js
   // D65 standard referent
  
  func rgb2xyz(_ x:CGFloat) -> CGFloat {
    let val = x/255;
    if val <= 0.04045
    { return (val / 12.92)}
    else { return (pow((val + 0.055) / 1.055,2.4)); }
  }
  
  func xyz2lab(_ tee:CGFloat) -> CGFloat{
    if tee > 0.008856 { return (pow(tee,(1/3)));}
    else { return (tee*903.3+16) / 116 ;}
  }
  
  func rgb_to_lab(red:CGFloat, green:CGFloat, blue:CGFloat) ->  (CGFloat, CGFloat, CGFloat)
  {
    let Xn:CGFloat = 0.950470
    let Zn:CGFloat = 1.088830
    let b = rgb2xyz(red)
    let a = rgb2xyz(green)
    let l = rgb2xyz(blue)
    let x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l)/Xn)
    let y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.0721750 * l))
    let z = xyz2lab((0.0193339 * b + 0.1191920 * a + 0.9503041 * l)/Zn)
    return (116 * y - 16, 500 * (x - y), 200 * (y - z))
  }
  
  @objc
  func getPixelColorHex(_ path: String, refr: Int, refg: Int, refb: Int, callback: ([[String : Any]]) -> ()) -> Void {
    //Get image data
    let imageUI    = UIImage(contentsOfFile: path)
    let image = imageUI!.cgImage
    let imageWidth = imageUI!.size.width
    let imageHeight = imageUI!.size.height
    let allocateData = image!.dataProvider
    let pixelData = allocateData!.data;
    let data: UnsafePointer<UInt8> = CFDataGetBytePtr(pixelData)
    
    //Ref color
    let initR = Float(refr)
    let initG = Float(refg)
    let initB = Float(refb)
    let colorR = CGFloat(initR)
    let colorG = CGFloat(initG)
    let colorB = CGFloat(initB)
    let (labRefRed, labRefGreen, labRefBlue) = rgb_to_lab(red: colorR, green: colorG, blue: colorB);
    //Find color for each pixel
    //var colors: [NSString] = []
    var pixelInfo: Int
    var r: CGFloat
    var g: CGFloat
    var b: CGFloat
    
    //var score: CGFloat = 0.0
    var ratioSim: CGFloat = 0.0
    var distance: CGFloat = 0
    //var rgb: Int
    let myIntValueX:Int = Int(imageWidth)
    let myIntValueY:Int = Int(imageHeight)
    for x in 1...myIntValueX {
      for y in 1...myIntValueY {
        pixelInfo = ((Int(imageWidth) * Int(x)) + Int(y)) * 4
        r = CGFloat(data[pixelInfo])
        g = CGFloat(data[pixelInfo+1])
        b = CGFloat(data[pixelInfo+2])
        //a = CGFloat(data[pixelInfo+3]) / CGFloat(255.0)
        let (labRed, labGreen, labBlue) = rgb_to_lab(red: r, green: g, blue: b);
        let d = pow( pow(labRed-labRefRed,2) + pow(labGreen-labRefGreen,2) + pow(labBlue-labRefBlue,2),0.5)
        //var rcomp = 1 / pow(1 + abs(colorR - r),0.5)
        //var gcomp = 1 / pow(1 + abs(colorG - g),0.5)
        //var bcomp = 1 / pow(1 + abs(colorB - b),0.5)
        //if (rcomp < 0.25) {
        //  rcomp = 0
        //}
        //distance = d + distance
        if (d < 45) {
          distance = distance + 1
        }
        //rgb = (Int)(r*255)<<16 | (Int)(g*255)<<8 | (Int)(b*255)<<0
        //colors.append(NSString(format:"#%06x", rgb))
      }
    }
    distance = distance / CGFloat(myIntValueY*myIntValueX)
    distance = distance * 1000
    let scoreInt = Int(round(distance))

    
    
    // Date is ready to use!
    callback( [[
      "colors": scoreInt,
      ]])
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
}
