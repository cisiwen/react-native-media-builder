//
//  RNMediaBuilderModule.swift
//  RNMediaBuilderModule
//
//  Copyright © 2022 cisiwen. All rights reserved.
//

import Foundation

@objc(RNMediaBuilderModule)
class RNMediaBuilderModule: NSObject {
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["count": 1]
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
