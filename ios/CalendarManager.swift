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
  
  @objc
  func getPixelColorHex(_ path: String, callback: ([[String : Any]]) -> ()) -> Void {
    let imageUI    = UIImage(contentsOfFile: path)
    let image = imageUI!.cgImage
    let imageWidth = imageUI!.size.width
    let imageHeight = imageUI!.size.height
    let allocateData = image!.dataProvider
    let pixelData = allocateData!.data;
    let data: UnsafePointer<UInt8> = CFDataGetBytePtr(pixelData)
    var colors: [NSString] = []
    var pixelInfo: Int
    var r: CGFloat
    var g: CGFloat
    var b: CGFloat
    //var a: CGFloat
    var rgb: Int
    let myIntValueX:Int = Int(imageWidth)
    let myIntValueY:Int = Int(imageHeight)
    for x in 1...myIntValueX {
      for y in 1...myIntValueY {
        pixelInfo = ((Int(imageWidth) * Int(x)) + Int(y)) * 4
        r = CGFloat(data[pixelInfo]) / CGFloat(255.0)
        g = CGFloat(data[pixelInfo+1]) / CGFloat(255.0)
        b = CGFloat(data[pixelInfo+2]) / CGFloat(255.0)
        //a = CGFloat(data[pixelInfo+3]) / CGFloat(255.0)
        rgb = (Int)(r*255)<<16 | (Int)(g*255)<<8 | (Int)(b*255)<<0
        colors.append(NSString(format:"#%06x", rgb))
      }
    }
    

    
    
    // Date is ready to use!
    callback( [[
      "colors": colors,
      ]])
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
}
