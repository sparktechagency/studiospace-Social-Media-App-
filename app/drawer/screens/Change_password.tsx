import { changepassicon } from '@/assets/icon/Icon';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';

// --- Reusable Components ---

const Header: React.FC = () => (
    <View style={tw`bg-[#3A3E41] p-4 pt-12 flex-row justify-between items-center`}>
        <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-bold`}>Change Password</Text>
        <View style={tw`w-6`} />{/* Spacer */}
    </View>
);

const AuthInput: React.FC<{ label: string; value: string; onChangeText: (text: string) => void; showPassword?: boolean; onToggleVisibility?: () => void }> = ({ label, value, onChangeText, showPassword, onToggleVisibility }) => (
    <View style={tw`w-full`}>
        <Text style={tw`text-white text-base font-semibold mb-2`}>{label}</Text>
        <View style={tw`flex-row items-center bg-[#3A3E41] border border-gray-700 rounded-lg px-4 py-1`}>
            <Icon name="lock" size={20} color="#989898" />
            <TextInput
                style={tw`flex-1 text-white ml-3`}
                placeholder="*******"
                placeholderTextColor="#989898"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={onToggleVisibility}>
                <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#989898" />
            </TouchableOpacity>
        </View>
    </View>
);

// --- Main Change Password Screen ---
const ChangePasswordScreen = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showRetype, setShowRetype] = useState(false);

    const handleSaveChanges = () => {
        if (!currentPassword || !newPassword || !retypePassword) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }
        if (newPassword !== retypePassword) {
            Alert.alert("Error", "New passwords do not match.");
            return;
        }
        console.log("Password change requested.");
        Alert.alert("Success", "Your password has been changed successfully.");
    };

    return (
        <View style={tw`flex-1 bg-[#0F0E13]`}>
            <Header />
            <ScrollView contentContainerStyle={tw`p-6 items-center`}>
                {/* --- Icon --- */}
                <View style={tw`py-8`}>
                    <SvgXml xml={changepassicon} />
                </View>

                {/* --- Input Fields --- */}
                <View style={tw`w-full gap-6`}>
                    <AuthInput
                        label="Current Password"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        showPassword={showCurrent}
                        onToggleVisibility={() => setShowCurrent(!showCurrent)}
                    />
                    <AuthInput
                        label="New Password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        showPassword={showNew}
                        onToggleVisibility={() => setShowNew(!showNew)}
                    />
                    <AuthInput
                        label="Retype Password"
                        value={retypePassword}
                        onChangeText={setRetypePassword}
                        showPassword={showRetype}
                        onToggleVisibility={() => setShowRetype(!showRetype)}
                    />
                </View>

                {/* --- Save Button --- */}
                <TouchableOpacity
                    style={tw`bg-[#1778F2] py-3 rounded-md w-full mt-12`}
                    onPress={handleSaveChanges}
                >
                    <Text style={tw`text-white text-center font-bold text-base`}>Save Changes</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default ChangePasswordScreen;
