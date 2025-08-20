import tw from '@/lib/tailwind';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


// --- Type Definitions ---
interface SelectedFile {
    uri: string;
    name: string;
}

// --- Reusable Components ---
const Header: React.FC = () => (
    <View style={tw`bg-[#3A3E41] p-4 pt-12 flex-row justify-between items-center`}>
        <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-bold`}>Edit Profile</Text>
        <View style={tw`w-6`} />{/* Spacer */}
    </View>
);

const InfoInput: React.FC<{ icon: string; value: string; onChangeText: (text: string) => void; placeholder: string }> = ({ icon, value, onChangeText, placeholder }) => (
    <View style={tw`bg-[#1E1E1E] border border-gray-600 rounded-lg flex-row items-center px-4 py-3`}>
        <Icon name={icon} size={20} color="white" />
        <TextInput
            style={tw`flex-1 text-white ml-4`}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#B9B9B9"
        />
    </View>
);


// --- Main Settings Screen ---
const Edit_prifile = () => {
    const [name, setName] = useState('Harry');
    const [email, setEmail] = useState('LiamBentley@email.com');
    const [phone, setPhone] = useState('+88011111111111111');
    const [profileImage, setProfileImage] = useState<SelectedFile | null>(null);

    const handleImagePick = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: 'image/*' });
            if (!result.canceled && result.assets) {
                setProfileImage({ uri: result.assets[0].uri, name: result.assets[0].name });
            }
        } catch (err) {
            console.error('Error picking image:', err);
        }
    };

    const handleSaveChanges = () => {
        console.log("--- Saving Changes ---");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Phone:", phone);
        console.log("Profile Image:", profileImage);
        Alert.alert("Profile Updated", "Your changes have been saved successfully.");
    };

    return (
        <View style={tw`flex-1 bg-[#0F0E13]`}>
            <Header />
            <ScrollView contentContainerStyle={tw`p-6 items-center`}>
                {/* --- Profile Picture --- */}
                <View style={tw`relative mb-12`}>
                    <TouchableOpacity onPress={handleImagePick}>
                        <Image
                            source={{ uri: profileImage?.uri || 'https://placehold.co/90x90/EFEFEF/3A3E41?text=H' }}
                            style={tw`w-24 h-24 rounded-full`}
                        />
                        <View style={tw`absolute bottom-0 right-0 bg-[#1976D2] p-2 rounded-full border-2 border-[#0F0E13]`}>
                            <Icon name="camera" size={12} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* --- Input Fields --- */}
                <View style={tw`w-full gap-4`}>
                    <InfoInput icon="user-o" value={name} onChangeText={setName} placeholder="Enter your name" />
                    <InfoInput icon="envelope-o" value={email} onChangeText={setEmail} placeholder="Enter your email" />
                    <InfoInput icon="phone" value={phone} onChangeText={setPhone} placeholder="Enter your phone number" />
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

export default Edit_prifile;
