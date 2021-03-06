package com.example

import android.app.Application
import android.content.Context
import com.cisiwen.reactnativemediabuilder.RNMediaBuilderPackage
import com.facebook.react.*
import com.facebook.react.bridge.JSIModulePackage
import com.facebook.soloader.SoLoader
import com.swmansion.reanimated.ReanimatedJSIModulePackage
import java.lang.reflect.InvocationTargetException

class MainApplication : Application(), ReactApplication {

    private val mReactNativeHost = object : ReactNativeHost(this) {
        override fun getUseDeveloperSupport(): Boolean {
            return BuildConfig.DEBUG
        }

        override fun getPackages(): List<ReactPackage> {
            val packages = PackageList(this).packages
            // Packages that cannot be autolinked yet can be added manually here, for example:
            // packages.add(MyReactNativePackage());
            packages.add(RNMediaBuilderPackage())
            return packages
        }

        override fun getJSMainModuleName(): String {
            return "index"
        }

        override fun getJSIModulePackage(): JSIModulePackage? {
            return ReanimatedJSIModulePackage() // <- add
        }
    }

    override fun getReactNativeHost(): ReactNativeHost {
        return mReactNativeHost
    }

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)
        initializeFlipper(this, reactNativeHost.reactInstanceManager)
    }

    companion object {

        private fun initializeFlipper(
            context: Context,
            reactInstanceManager: ReactInstanceManager
        ) {
            if (BuildConfig.DEBUG) {
                try {
                    val aClass = Class.forName("com.example.ReactNativeFlipper")
                    aClass
                        .getMethod(
                            "initializeFlipper",
                            Context::class.java,
                            ReactInstanceManager::class.java
                        )
                        .invoke(null, context, reactInstanceManager)
                } catch (e: ClassNotFoundException) {
                    e.printStackTrace()
                } catch (e: NoSuchMethodException) {
                    e.printStackTrace()
                } catch (e: IllegalAccessException) {
                    e.printStackTrace()
                } catch (e: InvocationTargetException) {
                    e.printStackTrace()
                }
            }
        }
    }
}
