import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';

// --- Type Definitions ---
interface SelectedFile {
    uri: string;
    name: string;
}

// --- Reusable Components ---

const Header: React.FC<{ onSave: () => void }> = ({ onSave }) => (
    <View style={tw`bg-[#3A3E41] p-4 pt-12 flex-row justify-between items-center`}>
        <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-bold`}>Create Business Profile</Text>
        <TouchableOpacity style={tw`bg-[#4593F5] py-1 px-3 rounded-md flex-row items-center gap-2`} onPress={onSave}>
            <Icon name="save" size={16} color="white" />
            <Text style={tw`text-white font-semibold text-xs`}>Save</Text>
        </TouchableOpacity>
    </View>
);

const ImageUploader: React.FC<{ onSelectImage: (file: SelectedFile) => void; imageUri?: string; isAvatar?: boolean }> = ({ onSelectImage, imageUri, isAvatar }) => {
    const handlePress = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: 'image/*' });
            if (!result.canceled && result.assets) {
                onSelectImage({ uri: result.assets[0].uri, name: result.assets[0].name });
            }
        } catch (err) {
            console.error('Error picking image:', err);
        }
    };

    const containerStyle = isAvatar ? tw`w-20 h-20 rounded-full bg-gray-700 items-center justify-center border-2 border-gray-500` : tw`w-full h-36 bg-gray-700 items-center justify-center`;

    return (
        <TouchableOpacity style={containerStyle} onPress={handlePress}>
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={tw`w-full h-full ${isAvatar ? 'rounded-full' : ''}`} />
            ) : (
                <Icon name="camera" size={isAvatar ? 24 : 40} color="#989898" />
            )}
        </TouchableOpacity>
    );
};

const FormInput: React.FC<{ label: string; placeholder: string; value: string; onChangeText: (text: string) => void; icon?: string; multiline?: boolean }> = ({ label, placeholder, value, onChangeText, icon, multiline }) => (
    <View style={tw`mb-4`}>
        <Text style={tw`text-white font-bold mb-2`}>{label}</Text>
        <View style={tw`flex-row items-center bg-[#0F0E13] border border-gray-600 rounded-md px-3 ${multiline ? 'h-24' : 'h-10'}`}>
            {icon && <Icon name={icon} size={16} color="#989898" />}
            <TextInput
                style={tw`flex-1 text-white ml-2`}
                placeholder={placeholder}
                placeholderTextColor="#989898"
                value={value}
                onChangeText={onChangeText}
                multiline={multiline}
                textAlignVertical={multiline ? 'top' : 'center'}
            />
        </View>
    </View>
);

const PrivacyToggle: React.FC<{ label: string; value: boolean; onValueChange: (value: boolean) => void; icon: string }> = ({ label, value, onValueChange, icon }) => (
    <View style={tw`flex-row justify-between items-center py-3`}>
        <View style={tw`flex-row items-center gap-3`}>
            <Icon name={icon} size={20} color="#989898" />
            <Text style={tw`text-white font-bold`}>{label}</Text>
        </View>
        <Switch
            trackColor={{ false: "#767577", true: "#1778F2" }}
            thumbColor={"#f4f3f4"}
            onValueChange={onValueChange}
            value={value}
        />
    </View>
);

// --- Main Screen Component ---
const CreateBusinessProfile = () => {
    const [profilePhoto, setProfilePhoto] = useState<SelectedFile | null>(null);
    const [coverPhoto, setCoverPhoto] = useState<SelectedFile | null>(null);
    const [businessInfo, setBusinessInfo] = useState({
        name: '',
        category: '',
        location: '',
        description: '',
        website: '',
        email: '',
    });
    const [socialLinks, setSocialLinks] = useState({ instagram: '', youtube: '', facebook: '', linkedin: '' });
    const [privacy, setPrivacy] = useState({ showSocials: true, showLocation: true, showEmail: true });

    const handleSave = () => {
        console.log("--- Saving Business Profile ---");
        console.log("Profile Photo:", profilePhoto);
        console.log("Cover Photo:", coverPhoto);
        console.log("Business Info:", businessInfo);
        console.log("Social Links:", socialLinks);
        console.log("Privacy Settings:", privacy);
        Alert.alert("Profile Saved", "Your business profile has been created successfully.", [
            { text: "OK", onPress: () => router.push('/drawer/home') },

        ]);
    };

    return (
        <View style={tw`flex-1 bg-[#0F0E13]`}>
            <Header onSave={handleSave} />
            <ScrollView>
                <View style={tw`relative h-48`}>
                    <ImageUploader onSelectImage={setCoverPhoto} imageUri={coverPhoto?.uri} />
                    <View style={tw`absolute bottom-[-40px] w-full items-center`}>
                        <ImageUploader onSelectImage={setProfilePhoto} imageUri={profilePhoto?.uri} isAvatar />
                    </View>
                </View>

                <View style={tw`p-4 mt-12`}>
                    <View style={tw`bg-[#3A3E41] p-4 rounded-lg mb-4`}>
                        <Text style={tw`text-white text-xl font-bold mb-3`}>Business Information</Text>
                        <FormInput label="Business Name*" placeholder="Enter business name" value={businessInfo.name} onChangeText={text => setBusinessInfo(prev => ({ ...prev, name: text }))} />
                        <FormInput label="Art Category" placeholder="Select a Category" value={businessInfo.category} onChangeText={text => setBusinessInfo(prev => ({ ...prev, category: text }))} icon="tag" />
                        <FormInput label="Location" placeholder="Enter location" value={businessInfo.location} onChangeText={text => setBusinessInfo(prev => ({ ...prev, location: text }))} icon="map-marker" />
                    </View>

                    <View style={tw`bg-[#3A3E41] p-4 rounded-lg mb-4`}>
                        <Text style={tw`text-white text-xl font-bold mb-3`}>Description & Contact</Text>
                        <FormInput label="Business Description" placeholder="Describe your business" value={businessInfo.description} onChangeText={text => setBusinessInfo(prev => ({ ...prev, description: text }))} multiline />
                        <FormInput label="Website" placeholder="https://example.com" value={businessInfo.website} onChangeText={text => setBusinessInfo(prev => ({ ...prev, website: text }))} icon="globe" />
                        <FormInput label="Email Address" placeholder="contact@example.com" value={businessInfo.email} onChangeText={text => setBusinessInfo(prev => ({ ...prev, email: text }))} icon="envelope" />

                        <Text style={tw`text-white font-bold mt-4 mb-2`}>Social Links</Text>
                        <FormInput label='' icon="instagram" placeholder="Instagram URL" value={socialLinks.instagram} onChangeText={text => setSocialLinks(prev => ({ ...prev, instagram: text }))} />
                        <FormInput label='' icon="youtube" placeholder="YouTube URL" value={socialLinks.youtube} onChangeText={text => setSocialLinks(prev => ({ ...prev, youtube: text }))} />
                        <FormInput label='' icon="facebook" placeholder="Facebook URL" value={socialLinks.facebook} onChangeText={text => setSocialLinks(prev => ({ ...prev, facebook: text }))} />
                        <FormInput label='' icon="linkedin" placeholder="LinkedIn URL" value={socialLinks.linkedin} onChangeText={text => setSocialLinks(prev => ({ ...prev, linkedin: text }))} />
                    </View>

                    <View style={tw`bg-[#3A3E41] p-4 rounded-lg`}>
                        <Text style={tw`text-white text-xl font-bold mb-2`}>Privacy Settings</Text>
                        <PrivacyToggle icon="link" label="Show social links publicly" value={privacy.showSocials} onValueChange={value => setPrivacy(prev => ({ ...prev, showSocials: value }))} />
                        <PrivacyToggle icon="map-marker" label="Show location publicly" value={privacy.showLocation} onValueChange={value => setPrivacy(prev => ({ ...prev, showLocation: value }))} />
                        <PrivacyToggle icon="envelope" label="Show email publicly" value={privacy.showEmail} onValueChange={value => setPrivacy(prev => ({ ...prev, showEmail: value }))} />
                    </View>

                    <View style={tw`mt-6`}>


                        <TouchableOpacity style={tw`w-full flex-row items-center justify-center  rounded-md p-2 gap-4 bg-[#1778F2] mb-4`} onPress={handleSave}>
                            <Text style={tw`text-white font-semibold text-lg `}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default CreateBusinessProfile;
