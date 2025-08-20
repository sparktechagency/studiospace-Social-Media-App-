import { imageAssets } from '@/assets/images/image';
import tw from '@/lib/tailwind';
import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const AccountSwitchModal = () => {

    const handleLogin = () => {
        console.log('Login button pressed for Creative Studio Inc.');
        // Navigate to the login screen for this account
    };

    return (
        <TouchableOpacity style={tw`bg-[#3A3E41] rounded-t-3xl p-4`}>
            {/* Modal Handle */}
            <View style={tw`items-center mb-6`}>
                <View style={tw`w-16 h-1.5 bg-gray-500 rounded-full`} />
            </View>

            {/* Profile Section */}
            <TouchableOpacity onPress={() => router.push('/drawer/screens/Business_profile')} style={tw`flex-row items-center mb-8`}>
                <Image
                    source={imageAssets.avater}
                    style={tw`w-16 h-16 rounded-full`}
                />
                <View style={tw`ml-4`}>
                    <Text style={tw`text-white text-xl font-bold`}>Creative Studio Inc.</Text>
                    <View style={tw`flex-row items-center gap-2 mt-1`}>
                        <View style={tw`w-2.5 h-2.5 bg-red-500 rounded-full`} />
                        <Text style={tw`text-white text-xs`}>1 notification</Text>
                    </View>
                </View>
            </TouchableOpacity>

            {/* Log In Button */}
            <TouchableOpacity
                style={tw`bg-[#1778F2] py-3 rounded-md w-full mb-8`}
                onPress={handleLogin}
            >
                <Text style={tw`text-white text-center font-bold text-base`}>Log In</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default AccountSwitchModal;
