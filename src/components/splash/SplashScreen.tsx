import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text, Animated, Easing } from "react-native";
import { Image } from "expo-image";
import { SvgXml } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Asset } from "expo-asset";
import LottieView from "lottie-react-native";
import { useLanguage } from "../../i18n/LanguageContext";

interface SplashScreenProps {
  onFinish: () => void;
}

// 폰트 설정을 위한 TypeScript 인터페이스
interface FontStyle {
  fontFamily?: string;
  fontSize: number;
  color: string;
  fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  // 다국어 지원
  const { t } = useLanguage();

  // 안전 영역 설정
  const insets = useSafeAreaInsets();

  // 애니메이션 값 설정
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    // 페이드 인 애니메이션
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();

    // Lottie 애니메이션 시작
    if (lottieRef.current) {
      lottieRef.current.play();
    }

    // 2.5초 후에 스플래시 스크린 종료
    const timer = setTimeout(() => {
      // 페이드 아웃 애니메이션
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start(() => {
        onFinish();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, onFinish]);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* 로티 애니메이션 로고 */}
        <View style={styles.logoContainer}>
          <LottieView
            ref={lottieRef}
            style={styles.lottieAnimation}
            source={require("../../../assets/lottie/globe.json")}
            autoPlay
            loop
          />
        </View>

        {/* 앱 이름 */}
        <Text style={styles.title}>{t("splash.appName")}</Text>

        {/* 로딩 텍스트만 표시 */}
        <Text style={styles.loadingText}>{t("splash.loading")}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundMap: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.2,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  lottieAnimation: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2a6cbf",
    marginBottom: 20,
    textAlign: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
});

export default SplashScreen;
