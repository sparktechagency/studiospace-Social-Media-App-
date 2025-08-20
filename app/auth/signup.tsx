import { GoogleIcon } from '@/assets/icon/Icon';
import { imageAssets } from '@/assets/images/image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
import BackButton from '../../components/ui/Back_button';

// --- Reusable Components ---

const AuthInput: React.FC<{ icon: string; placeholder: string; value: string; onChangeText: (text: string) => void; secureTextEntry?: boolean; onToggleVisibility?: () => void; showPassword?: boolean }> = ({ icon, placeholder, value, onChangeText, secureTextEntry, onToggleVisibility, showPassword }) => (
    <View style={tw`w-full flex-row items-center border border-white rounded-md p-1 px-2`}>
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

const SocialButton: React.FC<{ icon: string; text: string; onPress: () => void }> = ({ icon, text, onPress }) => (
    <TouchableOpacity
        style={tw`w-full flex-row items-center justify-center border border-gray-400 rounded-md p-3 gap-4`}
        onPress={onPress}
    >
        <SvgXml xml={GoogleIcon} />
        <Text style={tw`text-white font-semibold`}>{text}</Text>
    </TouchableOpacity>
);

// --- Main Signup Screen ---
const SignUpScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleRegister = () => {
        if (!agreedToTerms) {
            alert('You must agree to the terms and privacy policy.');
            return;
        }
        console.log('Registration attempt with:', { name, email, phone, password });
        // Handle registration logic here
    };

    return (
        <ScrollView contentContainerStyle={tw`flex-grow justify-center`} style={tw`flex-1 bg-[#0F0E13]`}>
            <View style={tw`pt-6`}>
                <BackButton />
            </View>
            <View style={tw`p-6`}>

                {/* --- Logo & Title --- */}
                <View style={tw`items-center mb-4 `}>
                    <View style={tw`items-center  mt-2`}>

                        <View style={tw``}>
                            <Image source={imageAssets.logo} style={tw`w-32 h-32`} />
                        </View>


                    </View>
                    <Text style={tw`text-white text-3xl font-bold mt-6`}>Register Your Account</Text>
                </View>

                {/* --- Form --- */}
                <View style={tw`gap-5`}>
                    <AuthInput icon="user-o" placeholder="Enter your name" value={name} onChangeText={setName} />
                    <AuthInput icon="envelope-o" placeholder="Enter your email" value={email} onChangeText={setEmail} />
                    <AuthInput icon="phone" placeholder="Enter your phone number" value={phone} onChangeText={setPhone} />
                    <AuthInput
                        icon="lock"
                        placeholder="Enter password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        onToggleVisibility={() => setShowPassword(!showPassword)}
                        showPassword={showPassword}
                    />
                    <AuthInput
                        icon="lock"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        onToggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
                        showPassword={showConfirmPassword}
                    />

                    <View style={tw`flex-row items-start gap-2`}>
                        <TouchableOpacity style={tw`mt-1`} onPress={() => setAgreedToTerms(!agreedToTerms)}>
                            <View style={tw`w-5 h-5 border border-white rounded-sm items-center justify-center`}>
                                {agreedToTerms && <Icon name="check" size={12} color="white" />}
                            </View>
                        </TouchableOpacity>
                        <Text style={tw`text-gray-400 flex-1`}>
                            By creating this account, you agree to the{' '}
                            <Text style={tw`text-white`}>terms of use</Text> &{' '}
                            <Text style={tw`text-white`}>privacy policy</Text>.
                        </Text>
                    </View>

                    <TouchableOpacity style={tw`bg-[#1778F2] py-3 rounded-md mt-4`} onPress={handleRegister}>
                        <Text style={tw`text-white text-center font-bold text-base`}>Register</Text>
                    </TouchableOpacity>

                    <Text style={tw`text-gray-500 text-center`}>or</Text>

                    <SocialButton icon="google" text="Continue with Google" onPress={() => console.log('Google Sign-up')} />
                </View>

                {/* --- Footer --- */}
                <View style={tw`flex-row justify-center items-center mt-8`}>
                    <Text style={tw`text-white`}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/auth/Login')}>
                        <Text style={tw`text-[#4593F5] font-semibold underline`}>Login here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUpScreen;
