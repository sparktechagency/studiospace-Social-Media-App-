import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
import BackButton from '../components/ui/Back_button';

// --- Reusable Components ---

const AuthInput: React.FC<{ icon: string; placeholder: string; value: string; onChangeText: (text: string) => void; }> = ({ icon, placeholder, value, onChangeText }) => (
    <View style={tw`w-full flex-row items-center border border-white rounded-md p-1 px-2`}>
        <Icon name={icon} size={20} color="#B9B9B9" />
        <TextInput
            style={tw`flex-1 text-white ml-3`}
            placeholder={placeholder}
            placeholderTextColor="#B9B9B9"
            value={value}
            onChangeText={onChangeText}
            keyboardType="email-address"
        />
    </View>
);

// --- Main Forgot Password Screen ---
const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');

    const handleSendOtp = () => {
        if (!email.trim()) {
            Alert.alert("Email Required", "Please enter your email address.");
            return;
        }
        console.log('Sending OTP to:', email);
        // Handle OTP sending logic here
        Alert.alert(
            "OTP Sent",
            `A 6-digit OTP has been sent to ${email}.`,
            [
                {
                    text: "OK",
                    onPress: () => router.push('/(auth)/OtpVerify')
                }
            ]
        );
    };

    return (
        <ScrollView contentContainerStyle={tw`flex-grow `} style={tw`flex-1 bg-[#0F0E13]`}>
            <BackButton />
            <View style={tw`p-6`}>

                {/* --- Logo & Title --- */}
                <View style={tw`items-center mb-10 mt-20`}>
                    <View style={tw``}>
                        <Image source={require('../../assets/images/logo.png')} style={tw`w-32 h-32`} />
                    </View>
                    <Text style={tw`text-white text-3xl font-bold mt-6 text-center pt-4`}>Forgot your password?</Text>
                </View>

                {/* --- Form --- */}
                <View style={tw`gap-6 pt-14`}>
                    <Text style={tw`text-gray-300 text-center text-sm`}>
                        Enter your email here. We will send you a 6 digit OTP via your email address.
                    </Text>

                    <AuthInput
                        icon="envelope-o"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TouchableOpacity style={tw`bg-[#1778F2] py-3 rounded-md mt-4`} onPress={handleSendOtp}>
                        <Text style={tw`text-white text-center font-bold text-base`}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default ForgotPasswordScreen;
