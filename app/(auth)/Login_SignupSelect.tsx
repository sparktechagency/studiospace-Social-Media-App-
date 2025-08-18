import { signSelectIcon } from '@/assets/icon/Icon';
import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import tw from 'twrnc';

// --- Reusable Button Component ---
const ActionButton: React.FC<{ title: string; onPress: () => void; primary?: boolean }> = ({ title, onPress, primary }) => (
    <TouchableOpacity
        style={tw`w-full py-3 rounded-md ${primary ? 'bg-[#1778F2]' : 'border border-white'}`}
        onPress={onPress}
    >
        <Text style={tw`text-white text-center font-bold text-base`}>{title}</Text>
    </TouchableOpacity>
);

// --- Main Login/Signup Screen ---
const LoginSignupSelect = () => {
    const handleSignUp = () => {
        console.log('Sign Up button pressed');
        // Navigate to Sign Up screen
        router.push('/signup');
    };

    const handleLogin = () => {
        console.log('Login button pressed');
        // Navigate to Login screen
        router.push('/(auth)/Login');
    };

    return (
        <View style={tw`flex-1 bg-[#0F0E13] justify-center items-center px-8`}>
            {/* --- Illustration Placeholder --- */}
            <View style={tw`pb-8`}>
                <Image source={require('../../assets/images/logo.png')} style={tw`w-32 h-32`} />
            </View>
            <View style={tw`items-center justify-center mb-20`}>
                <SvgXml xml={signSelectIcon} />
                <Text style={tw`text-white text-3xl font-bold mt-8`}>Welcome</Text>
                <Text style={tw`text-gray-400 text-center mt-2`}>
                    Join our community to connect with professionals and discover new opportunities.
                </Text>
            </View>

            {/* --- Action Buttons --- */}
            <View style={tw`w-full`}>
                <ActionButton title="Sign Up" onPress={handleSignUp} primary />
                <View style={tw`h-4`} />{/* Spacer */}
                <ActionButton title="Login" onPress={handleLogin} />
            </View>
        </View>
    );
};

export default LoginSignupSelect;
