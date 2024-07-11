export default {
    expo: {
        scheme: "edu",
        name: "sentence-surgeons-ui",
        slug: "sentence-surgeons-ui",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "light",
        splash: {
          image: "./assets/splash.png",
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        },
        ios: {
          supportsTablet: true,
          usesAppleSignIn: true,
          bundleIdentifier: "com.chrisxadvocatus.sentencesurgeonsui"
        },
        android: {
          adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#ffffff"
          },
          package: "com.chrisxadvocatus.sentencesurgeonsui"
        },
        web: {
          favicon: "./assets/favicon.png"
        },
        plugins: [
          "expo-secure-store",
          "expo-apple-authentication",
          [
            "@react-native-google-signin/google-signin",
            {
              iosUrlScheme: "com.googleusercontent.apps.349767955495-dq1m2b219lbmd6a17muu5orodi5fmjo1"
            }
          ]
        ],
        extra: {
          eas: {
            projectId: "35579c0d-ea34-4fa4-a648-78888d08c7f5"
          },
          "apiUrl": process.env.EXPO_PUBLIC_LAMDA_URL,
          "googleClientId": process.env.EXPO_PUBLIC_GOOGLE_WEB_CLT,
        }
      }    
  };
  