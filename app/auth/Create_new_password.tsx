import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
import BackButton from '../../components/ui/Back_button';

// --- Reusable Components ---

const AuthInput: React.FC<{ icon: string; placeholder: string; value: string; onChangeText: (text: string) => void; secureTextEntry?: boolean; onToggleVisibility?: () => void; showPassword?: boolean }> = ({ icon, placeholder, value, onChangeText, secureTextEntry, onToggleVisibility, showPassword }) => (
    <View style={tw`w-full flex-row items-center border border-white rounded-full p-1 px-4`}>
        <Icon name={icon} size={20} color="#B9B9B9" />
        <TextInput
            style={tw`flex-1 text-white ml-3`}
            placeholder={placeholder}
            placeholderTextColor="#B9B9B9"
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
        {onToggleVisibility && (
            <TouchableOpacity onPress={onToggleVisibility}>
                <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#888888" />
            </TouchableOpacity>
        )}
    </View>
);

// --- Main Create New Password Screen ---
const CreateNewPasswordScreen = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChangePassword = () => {
        if (!password || !confirmPassword) {
            Alert.alert("Error", "Please fill in both password fields.");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        console.log('Changing password to:', password);
        // Handle password change logic here
        Alert.alert(
            "Success!",
            "Your password has been changed successfully.",
            [{ text: "OK", onPress: () => router.push('/auth/Atuthentication_success') }]
        );
    };

    return (
        <ScrollView contentContainerStyle={tw`flex-grow pt-4 `} style={tw`flex-1 bg-[#0F0E13]`}>
            <BackButton />
            <View style={tw`p-6`}>
                {/* --- Header --- */}

                {/* --- Logo & Title --- */}
                <View style={tw`items-center mb-10 mt-20`}>

                    <View style={tw``}>
                        <Image source={require('../../assets/images/logo.png')} style={tw`w-32 h-32`} />
                    </View>
                    <Text style={tw`text-white text-3xl font-bold mt-6 text-center pt-4`}>Set your new password</Text>
                </View>

                {/* --- Form --- */}
                <View style={tw`gap-6`}>
                    <Text style={tw`text-gray-300 text-center text-sm`}>
                        It must be different from your previous password.
                    </Text>

                    <AuthInput
                        icon="lock"
                        placeholder="Enter a password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        onToggleVisibility={() => setShowPassword(!showPassword)}
                        showPassword={showPassword}
                    />

                    <AuthInput
                        icon="lock"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        onToggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
                        showPassword={showConfirmPassword}
                    />

                    <TouchableOpacity style={tw`bg-[#1778F2] py-3 rounded-md mt-4`} onPress={handleChangePassword}>
                        <Text style={tw`text-white text-center font-bold text-base`}>Change password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default CreateNewPasswordScreen;
