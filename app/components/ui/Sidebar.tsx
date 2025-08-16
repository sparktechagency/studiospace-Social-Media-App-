import React from 'react';
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={tw`flex-1 flex-row bg-black bg-opacity-50`}>
                <View style={tw`w-[75%] h-full bg-[#1A1C20] rounded-r-[30px]`}>
                    {/* Header Section */}
                    <View style={tw`bg-[#3A3E41] p-4 pt-10`}>
                        {/* FIX: This button now correctly uses the onClose prop */}
                        <TouchableOpacity onPress={onClose} style={tw`self-start mb-4`}>
                            <Icon name="arrow-left" size={20} color="white" />
                        </TouchableOpacity>
                        <View style={tw`items-start gap-2`}>
                            <Image
                                source={require('../../../assets/images/avater/avater3.png')}
                                style={tw`w-24 h-24 rounded-full`}
                            />
                            <View>
                                <Text style={tw`text-white text-2xl font-bold`}>Harry</Text>
                                <Text style={tw`text-white text-base font-medium`}>UI/UX Designer</Text>
                            </View>
                        </View>
                    </View>

                    {/* Navigation Links */}
                    <ScrollView style={tw`p-4`}>
                        <SidebarItem icon="home" text="Home" />
                        <SidebarItem icon="user" text="My Profile" />
                        <SidebarItem icon="briefcase" text="Create Business .." />

                        <View style={tw`mt-4`}>
                            <SidebarItem icon="compass" text="Discovery" />
                            <SidebarItem icon="users" text="My Network" />
                            <SidebarItem icon="bookmark" text="Saved" />
                            <SidebarItem icon="eye" text="Profile Views" />
                            <SidebarItem icon="plus-square" text="Create Group" />
                        </View>

                        <View style={tw`mt-8`}>
                            <Text style={tw`text-[#B9B9B9] text-xs font-bold mb-2`}>PREFERENCE</Text>
                            <SidebarItem icon="cog" text="Settings" />
                        </View>
                    </ScrollView>

                    {/* Footer Section */}
                    <View style={tw`p-4 border-t border-gray-700`}>
                        <SidebarItem icon="question-circle" text="Help & Support" />
                        <SidebarItem icon="sign-out" text="Log Out" />
                    </View>
                </View>

                {/* Clickable overlay to close the sidebar */}
                <TouchableOpacity style={tw`flex-1`} onPress={onClose} />
            </View>
        </Modal>
    );
};

export default Sidebar;
