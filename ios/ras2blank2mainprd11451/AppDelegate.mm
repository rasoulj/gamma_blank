#import "AppDelegate.h"
#import <Firebase.h> // <- FIREBASE
#import <FBSDKCoreKit/FBSDKCoreKit.h> // <- FACEBOOK

#import <React/RCTBundleURLProvider.h>
#import <React/RCTBridge.h>
#import <GoogleMaps/GoogleMaps.h>

#import <React/RCTLinkingManager.h>// DEEP LINKING
@implementation AppDelegate

//<- DEEP LINKING
- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  NSString *myUrl = url.absoluteString;
  if ([myUrl containsString:@"fb1372515063315534"]) {
    return [[FBSDKApplicationDelegate sharedInstance] application:application
                                                                openURL:url
                                                      sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                                                             annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
                  ];
  } else {
    return [RCTLinkingManager application:application openURL:url options:options];
  }
}
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:@"AIzaSyB4MfDPM7eiAftxCK2EFMI_tRzsy4rK90Y"];  // <- GOOGLE MAPS

  // <- FIREBASE \/
  [FIRApp configure];
  // <- FIREBASE --- /\
  
  self.moduleName = @"ras2blank2mainprd11451";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  // <- FACEBOOK
  [[FBSDKApplicationDelegate sharedInstance] application:application
                         didFinishLaunchingWithOptions:launchOptions];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

// Add this inside `@implementation AppDelegate` above `@end`:
- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
 return [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                    restorationHandler:restorationHandler];
}

@end
