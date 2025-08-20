import { downcircleicon, downicon, upcircleicon } from '@/assets/icon/Icon';
import { imageAssets } from '@/assets/images/image';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';

// --- Type Definition for Sidebar Props ---
interface SidebarProps {
    visible?: boolean;
    onClose: () => void;
}

// --- Reusable Sidebar Item Component ---
const SidebarItem: React.FC<{ icon: string; text: string; onPress?: () => void }> = ({ icon, text, onPress }) => (
    <TouchableOpacity style={tw`flex-row items-center gap-3 py-3`} onPress={onPress}>
        <Icon name={icon} size={22} color="#B9B9B9" />
        <Text style={tw`text-[#B9B9B9] text-base font-bold`}>{text}</Text>
    </TouchableOpacity>
);

// --- Sidebar Component ---
const Sidebar: React.FC<SidebarProps> = ({ visible, onClose }) => {
    // This function can be used for navigation if you import `useRouter` from `expo-router`
    const handleNavigate = (path: string) => {
        // useRouter().push(path);
        onClose(); // Close the sidebar after navigating
    };

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', onPress: () => router.push('/auth/Login_SignupSelect') },
        ])
        onClose(); // Close the sidebar after logout
    };

    return (
        <>
            <View style={tw` bg-black bg-opacity-50`}>
                <View style={tw` h-full bg-[#1A1C20] rounded-r-[30px]`}>
                    {/* Header Section */}
                    <View style={tw`bg-[#3A3E41] p-4 pt-10`}>
                        {/* FIX: This button now correctly uses the onClose prop */}
                        <TouchableOpacity onPress={onClose} style={tw`self-start mb-4`}>
                            <Icon name="arrow-left" size={20} color="white" />
                        </TouchableOpacity>
                        <View style={tw`items-start gap-2`}>
                            <Image
                                source={imageAssets.avater}
                                style={tw`w-24 h-24 rounded-full`}
                            />
                            <View>
                                <Text style={tw`text-white text-2xl font-bold`}>Harry</Text>
                                <Text style={tw`text-white text-base font-medium`}>UI/UX Designer</Text>
                            </View>
                        </View>
                    </View>

                    {/* Navigation Links */}
                    <ScrollView style={tw`p-4 `}>
                        <SidebarItem onPress={() => {
                            onClose();
                            router.push('/drawer/home')
                        }} icon="home" text="Home" />
                        <View style={tw`flex flex-row items-center justify-between`}>
                            <SidebarItem onPress={() => {
                                onClose();
                                router.push('/auth/Login_SignupSelect')
                            }} icon="user" text="My Profile" />
                            <TouchableOpacity style={tw`flex-row items-center gap-3 py-3`} onPress={() => {
                                onClose();
                                router.push('/modals/account_switch_modal')
                            }}>
                                <View style={tw`relative`}>
                                    <SvgXml style={tw`absolute -top-1.8 -right-0.2`} xml={upcircleicon} />
                                    <Image source={imageAssets.avater} style={tw`w-6 h-6 mr-1.5 rounded-full`} />

                                    <SvgXml style={tw`absolute -bottom-1.8 -right-0.2`} xml={downcircleicon} />
                                </View>
                                <SvgXml xml={downicon} />
                            </TouchableOpacity>
                        </View>

                        <SidebarItem onPress={() => {
                            onClose();
                            router.push('/drawer/screens/Business_profile')
                        }} icon="briefcase" text="Create Business .." />

                        <View style={tw``}>
                            <SidebarItem onPress={() => {
                                onClose();
                                router.push('/drawer/screens/Discovery')
                            }} icon="compass" text="Discovery" />
                            <SidebarItem onPress={() => {
                                onClose();
                                router.push('/drawer/home/network')
                            }} icon="users" text="My Network" />
                            <SidebarItem onPress={() => {
                                onClose();
                                router.push('/drawer/screens/Saved_posts')
                            }} icon="bookmark" text="Saved" />
                            <SidebarItem onPress={() => {
                                onClose();
                                router.push('/drawer/home/profile')
                            }} icon="eye" text="Profile Views" />
                            <SidebarItem icon="plus-square" text="Create Group" />
                        </View>

                        <View style={tw`mt-8 pb-4`}>
                            <Text style={tw`text-[#B9B9B9] text-xs font-bold mb-2`}>PREFERENCE</Text>
                            <SidebarItem onPress={() => {
                                onClose();
                                router.push('/drawer/screens/Seetings')
                            }} icon="cog" text="Settings" />
                        </View>
                    </ScrollView>

                    {/* Footer Section */}
                    <View style={tw`p-4 border-t border-gray-700`}>
                        <SidebarItem onPress={() => {
                            onClose();
                            router.push('/drawer/screens/HelpAnd_support')
                        }} icon="question-circle" text="Help & Support" />
                        <SidebarItem onPress={handleLogout} icon="sign-out" text="Log Out" />
                    </View>
                </View>

                {/* Clickable overlay to close the sidebar */}
                <TouchableOpacity style={tw`flex-1`} onPress={onClose} />
            </View>
        </>
    );
};

export default Sidebar;
