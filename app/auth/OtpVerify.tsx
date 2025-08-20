import { imageAssets } from '@/assets/images/image';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, Image, NativeSyntheticEvent, ScrollView, Text, TextInput, TextInputKeyPressEventData, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import BackButton from '../../components/ui/Back_button';

// --- Main OTP Verify Screen ---
const OtpVerifyScreen = () => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const inputs = useRef<TextInput[]>([]);

    const handleOtpChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Move to the next input if a digit is entered
        if (text && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        // Move to the previous input if backspace is pressed on an empty field
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const handleVerify = () => {
        const enteredOtp = otp.join('');
        if (enteredOtp.length !== 6) {
            Alert.alert("Incomplete OTP", "Please enter all 6 digits of the OTP.");
            return;
        }

        console.log('Verifying OTP:', enteredOtp);
        // Handle OTP verification logic here
        Alert.alert(
            "Success!",
            `Your OTP ${enteredOtp} has been verified.`,
            [{ text: "OK", onPress: () => router.push('/auth/Create_new_password') }]
        );
    };

    return (
        <ScrollView contentContainerStyle={tw`flex-grow `} style={tw`flex-1 bg-[#0F0E13] pt-4`}>
            <BackButton />
            <View style={tw`p-6`}>
                {/* --- Header --- */}

                {/* --- Logo & Title --- */}
                <View style={tw`items-center mb-10 mt-20`}>

                    <View style={tw``}>
                        <Image source={imageAssets.logo} style={tw`w-32 h-32`} />
                    </View>
                    <Text style={tw`text-white text-3xl font-bold mt-6 text-center`}>Enter OTP</Text>
                </View>

                {/* --- Form --- */}
                <View style={tw`gap-8 pt-8`}>
                    <Text style={tw`text-gray-300  text-sm`}>
                        Enter the OTP which we sent you through the email you provided.
                    </Text>

                    {/* --- OTP Input Fields --- */}
                    <View style={tw`flex-row justify-center gap-3`}>
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(ref: any) => inputs.current[index] = ref}
                                style={tw`w-12 h-12 border-2 border-white rounded-full text-white text-center text-lg`}
                                keyboardType="number-pad"

                                maxLength={1}
                                value={digit}
                                onChangeText={(text) => handleOtpChange(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                            />
                        ))}
                    </View>

                    <TouchableOpacity style={tw`bg-[#1778F2] py-3 rounded-md mt-4`} onPress={handleVerify}>
                        <Text style={tw`text-white text-center font-bold text-base`}>Verify</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default OtpVerifyScreen;
