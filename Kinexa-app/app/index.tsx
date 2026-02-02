import { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, Animated } from "react-native";


export default function Index() {

  const opacity = useRef(new Animated.Value(0)).current;
  const logoTranslateX = useRef(new Animated.Value(50)).current;
  const textTranslateX = useRef(new Animated.Value(40)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Logo aparece (no centro)
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),

      // Texto entra + logo se move junto
      Animated.parallel([
        Animated.timing(textTranslateX, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(logoTranslateX, {
          toValue: -10, // empurra o K pra esquerda
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);


  return (
    <View style={styles.container}>
      <Animated.Image source={require('../assets/images/logo.png')}
        resizeMode="contain"
        style={[{ opacity, transform: [{ translateX: logoTranslateX }] }]} />
      <Animated.Text
        style={[
          styles.text,
          {
            opacity: textOpacity,
            transform: [{ translateX: textTranslateX }],
          },
        ]}
      >
        inexa
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#101115",
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },

  text: {
    color: '#FFFFFF',
    fontSize: 40,
    letterSpacing: 2
  },
})