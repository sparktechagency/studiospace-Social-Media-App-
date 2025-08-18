import { successIcon } from '@/assets/icon/Icon';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import tw from 'twrnc';

// --- Main Authentication Success Screen ---
const AuthenticationSuccessScreen = () => {

    const handleBackToLogin = () => {
        console.log('Back to Login pressed');
        // Navigate to the Login screen
        router.push('/(auth)/Login');
    };

    return (
        <ScrollView contentContainerStyle={tw`flex-grow justify-center`} style={tw`flex-1 bg-[#0F0E13]`}>
            <View style={tw`p-6 items-center`}>
                {/* --- Success Icon --- */}
                <SvgXml xml={successIcon} />

                {/* --- Success Message --- */}
                <Text style={tw`text-white text-2xl font-bold text-center mb-12 px-8 pt-4`}>
                    Password changed successfully
                </Text>

                {/* --- Back to Login Button --- */}
                <TouchableOpacity
                    style={tw`bg-[#1778F2] py-3 rounded-md w-full`}
                    onPress={handleBackToLogin}
                >
                    <Text style={tw`text-white text-center font-bold text-base`}>Back to Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default AuthenticationSuccessScreen;
