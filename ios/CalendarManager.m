//
//  Counter.m
//  catchacolor
//
//  Created by Mathilde Igier on 20.10.18.
//  Copyright © 2018 Facebook. All rights reserved.
//

//#import <Foundation/Foundation.h>

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CalendarManager, NSObject)

RCT_EXTERN_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(nonnull NSNumber *)date callback: (RCTResponseSenderBlock)callback);

RCT_EXTERN_METHOD(increment)
RCT_EXTERN_METHOD(getCount: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getPixelColorHex:(NSString *)path callback:(RCTResponseSenderBlock)callback)


@end
