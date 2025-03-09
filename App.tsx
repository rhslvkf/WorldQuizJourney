import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";

// 다국어 지원
import { LanguageProvider } from "./src/i18n/LanguageContext";

// 컴포넌트 불러오기
import SplashScreenComponent from "./src/components/splash/SplashScreen";
import MainScreen from "./src/screens/MainScreen";

// 스플래시 스크린 표시 유지
SplashScreen.preventAutoHideAsync().catch(() => {
  /* 오류 무시 */
});

export default function App() {
  // 상태 관리
  const [appIsReady, setAppIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // 앱 로딩 처리
  useEffect(() => {
    async function prepare() {
      try {
        // 필요한 리소스 로딩 - 폰트, 데이터 등
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // 스플래시 스크린 완료 핸들러
  const onSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  // 레이아웃 준비 핸들러
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <LanguageProvider>
      <SafeAreaProvider>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <StatusBar style="auto" />

          {showSplash ? <SplashScreenComponent onFinish={onSplashFinish} /> : <MainScreen />}
        </View>
      </SafeAreaProvider>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
