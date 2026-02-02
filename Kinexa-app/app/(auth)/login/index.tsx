import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, Image, Text } from "react-native";

export default function Aluno() {
    const opacityPhoto = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacityPhoto, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('@/assets/images/aluno.png')}
                resizeMode="cover"
                style={[styles.photo,
                { opacity: opacityPhoto },
                ]}
            />
            <View style={styles.titulo}>
                <Image source={require('@/assets/images/logo.png')}
                    resizeMode="contain" />
                <Text
                    style={styles.text}
                >
                    inexa
                </Text>
            </View>

            {/* opções de Login/Registro... */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titulo: {
        position: 'absolute',
        top: 70,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        zIndex: 10,
    },
    photo: {
        width: "100%",
        height: "100%",
    },
    text: {
        color: '#FFFFFF',
        fontSize: 40,
        letterSpacing: 2,
    },
});

