import { GoogleIcon } from '@/assets/icon/Icon';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
import BackButton from '../components/ui/Back_button';

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

// --- Main Login Screen ---
const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = () => {
        console.log('Login attempt with:', { email, password, rememberMe });
        Alert.alert('Login Attempt', `you have logged in successfully with email: ${email}`, [
            { text: 'Ok', onPress: () => router.push('/(tabs)') }
        ]);
    };

    return (
        <ScrollView contentContainerStyle={tw`flex-grow  pt-4`} style={tw`flex-1 bg-[#0F0E13]`}>
            <BackButton />
            <View style={tw`p-6`}>


                <View style={tw`items-center mb-10 `}>

                    <View style={tw`pb-8`}>
                        <Image source={require('../../assets/images/logo.png')} style={tw`w-32 h-32`} />
                    </View>

                    <Text style={tw`text-white text-3xl font-bold mt-6`}>Login</Text>
                </View>
                <View style={tw`gap-5`}>
                    <AuthInput
                        icon="envelope-o"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <AuthInput
                        icon="lock"
                        placeholder="Enter password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        onToggleVisibility={() => setShowPassword(!showPassword)}
                        showPassword={showPassword}
                    />

                    <View style={tw`flex-row justify-between items-center`}>
                        <TouchableOpacity style={tw`flex-row items-center gap-2`} onPress={() => setRememberMe(!rememberMe)}>
                            <View style={tw`w-4 h-4 border border-white rounded-sm items-center justify-center`}>
                                {rememberMe && <Icon name="check" size={8} color="white" />}
                            </View>
                            <Text style={tw`text-white`}>Remember me</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push('/(auth)/Forgot_password')}>
                            <Text style={tw`text-white underline`}>Forgot password</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={tw`bg-[#1778F2] py-3 rounded-md`} onPress={handleLogin}>
                        <Text style={tw`text-white text-center font-bold text-base`}>Login</Text>
                    </TouchableOpacity>

                    <Text style={tw`text-gray-500 text-center`}>or</Text>

                    <SocialButton icon="google" text="Continue with Google" onPress={() => console.log('Google Sign-in')} />
                </View>

                {/* --- Footer --- */}
                <View style={tw`flex-row justify-center items-center mt-12`}>
                    <Text style={tw`text-white`}>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                        <Text style={tw`text-[#4593F5] font-semibold`}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default LoginScreen;
