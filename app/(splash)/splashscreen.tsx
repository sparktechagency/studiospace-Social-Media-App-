import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function Splashscreen() {
    const router = useRouter();

    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity: 0
    const translateYAnim = useRef(new Animated.Value(30)).current; // Start 30px below

    useEffect(() => {
        // Run the animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();

        // Redirect to (tabs) after 2.5 seconds
        const timeout = setTimeout(() => {
            router.replace('/firstonboardScreen');
        }, 2500);

        return () => clearTimeout(timeout); // Clean up
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../../assets/images/logo.png')}
                style={[
                    styles.logo,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: translateYAnim }],
                    },
                ]}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    },
});
