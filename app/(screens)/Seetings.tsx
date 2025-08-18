import tw from '@/lib/tailwind';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


// --- Reusable Components ---
const Header: React.FC = () => (
    <View style={tw`bg-[#3A3E41] p-4 pt-12 flex-row justify-between items-center`}>
        <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-bold`}>Settings</Text>
        <View style={tw`w-6`} />{/* Spacer */}
    </View>
);

const SettingsItem: React.FC<{ icon: string; text: string; onPress: () => void }> = ({ icon, text, onPress }) => (
    <TouchableOpacity
        style={tw`bg-[#1E1E1E] border border-gray-600 rounded-lg flex-row items-center px-4 py-4`}
        onPress={onPress}
    >
        <Icon name={icon} size={20} color="white" />
        <Text style={tw`flex-1 text-white ml-4 text-base`}>{text}</Text>
        <Icon name="chevron-right" size={16} color="white" />
    </TouchableOpacity>
);


// --- Main Settings Screen ---
const SettingsScreen = () => {

    const handleNavigation = (screen: string) => {
        console.log(`Navigating to ${screen}`);
        // In a real app, you would use a navigation library like Expo Router to navigate.
        // e.g., router.push('/edit-profile');
    };

    return (
        <View style={tw`flex-1 bg-[#0F0E13]`}>
            <Header />
            <ScrollView contentContainerStyle={tw`p-6`}>
                <View style={tw`w-full gap-4`}>
                    <SettingsItem
                        icon="user-o"
                        text="Edit Profile"
                        onPress={() => router.push('/(screens)/Edit_profile')}
                    />
                    <SettingsItem
                        icon="lock"
                        text="Change Password"
                        onPress={() => router.push('/(screens)/Change_password')}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default SettingsScreen;
