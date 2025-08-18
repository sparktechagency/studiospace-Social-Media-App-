

import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import { Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
import Header from '../components/ui/Header';

// --- Type for selected files ---
interface SelectedFile {
    uri: string;
    name: string;
    type?: string;
}

// --- Reusable Icon Button Component ---
const ActionButton: React.FC<{ icon: string; text: string; color: string; onPress: () => void }> = ({ icon, text, color, onPress }) => (
    <TouchableOpacity style={tw`flex-row items-center gap-2`} onPress={onPress}>
        <Icon name={icon} size={22} color={color} />
        <Text style={tw`text-white font-bold text-xs`}>{text}</Text>
    </TouchableOpacity>
);

// --- Privacy Selection Modal ---
const PrivacyModal: React.FC<{ visible: boolean; onClose: () => void; onSelect: (privacy: string) => void }> = ({ visible, onClose, onSelect }) => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
        <TouchableOpacity style={tw`flex-1 justify-end bg-black bg-opacity-50`} onPress={onClose} activeOpacity={1}>
            <View style={tw`bg-[#3A3E41] p-4 rounded-t-2xl`}>
                <TouchableOpacity style={tw`py-3`} onPress={() => { onSelect('Public'); onClose(); }}>
                    <Text style={tw`text-white text-lg text-center`}>Public</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`py-3 border-t border-gray-600`} onPress={() => { onSelect('Private'); onClose(); }}>
                    <Text style={tw`text-white text-lg text-center`}>Private</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    </Modal>
);

// --- Main Create Post Component ---
const CreatePost = () => {
    const [postText, setPostText] = useState('');
    const [privacy, setPrivacy] = useState('Public');
    const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
    const [isPrivacyModalVisible, setPrivacyModalVisible] = useState(false);

    const handleFilePick = async (type: 'image/*' | 'video/*' | 'application/*') => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: type,
                multiple: true,
            });

            if (!result.canceled) {
                const files = result.assets.map(asset => ({
                    uri: asset.uri,
                    name: asset.name,
                    type: asset.mimeType,
                }));
                setSelectedFiles(prev => [...prev, ...files]);
                console.log('Selected Files:', files);
            }
        } catch (err) {
            console.error('Error picking document:', err);
        }
    };

    const handlePost = () => {
        console.log('--- Submitting Post ---');
        console.log('Text:', postText);
        console.log('Privacy:', privacy);
        console.log('Files:', selectedFiles);
        // Here you would typically upload files and submit the post to your backend.
    };

    return (
        <View style={tw`flex-1 bg-[#0F0E13]`}>
            <Header title="Create Post" searchStatus={false} />

            <PrivacyModal
                visible={isPrivacyModalVisible}
                onClose={() => setPrivacyModalVisible(false)}
                onSelect={setPrivacy}
            />

            <ScrollView style={tw`flex-1`}>
                <View style={tw`p-4`}>
                    {/* --- User Info and Privacy --- */}
                    <View style={tw`flex-row justify-between items-center mb-5`}>
                        <View style={tw`flex-row items-center gap-4`}>
                            <Image
                                source={require('../../assets/images/avater/avater4.png')}
                                style={tw`w-14 h-14 rounded-full`}
                            />
                            <View>
                                <Text style={tw`text-white text-lg font-semibold`}>Mehedi</Text>
                                <Text style={tw`text-gray-300 text-sm`}>Software Engineer</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={tw`bg-[#3A3E41] flex-row items-center gap-2 p-2 rounded`} onPress={() => setPrivacyModalVisible(true)}>
                            <Icon name="globe" size={18} color="white" />
                            <Text style={tw`text-white font-semibold text-xs`}>{privacy}</Text>
                            <Icon name="caret-down" size={18} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* --- Text Input Area --- */}
                    <View style={tw`bg-[#3A3E41] rounded-xl p-4 min-h-[12rem]`}>
                        <TextInput
                            style={tw`text-white text-lg flex-1`}
                            placeholder="What’s on your mind?"
                            placeholderTextColor="#A0A0A0"
                            multiline
                            textAlignVertical="top"
                            value={postText}
                            onChangeText={setPostText}
                            maxLength={2000}
                        />
                        <Text style={tw`text-gray-400 text-right text-xs`}>{postText.length}/2000</Text>
                    </View>

                    {/* --- Selected Files Display --- */}
                    {selectedFiles.length > 0 && (
                        <View style={tw`mt-4`}>
                            <Text style={tw`text-white font-bold mb-2`}>Attachments:</Text>
                            {selectedFiles.map((file, index) => (
                                <Text key={index} style={tw`text-gray-300 text-xs`} numberOfLines={1}>- {file.name}</Text>
                            ))}
                        </View>
                    )}

                    {/* --- Action Buttons --- */}
                    <View style={tw`bg-[#3A3E41] rounded-lg p-3 mt-5 flex-row justify-around items-center`}>
                        <ActionButton icon="photo" text="Photo" color="#32D463" onPress={() => handleFilePick('image/*')} />
                        <ActionButton icon="video-camera" text="Video" color="#59A1F3" onPress={() => handleFilePick('video/*')} />
                        <ActionButton icon="file-text" text="Document" color="#DB2B2B" onPress={() => handleFilePick('application/*')} />
                    </View>
                </View>
            </ScrollView>

            {/* --- Submit Button --- */}
            <View style={tw`p-4 border-t border-gray-700`}>
                <TouchableOpacity style={tw`bg-[#1778F2] py-3 rounded-lg`} onPress={handlePost}>
                    <Text style={tw`text-white text-center font-bold text-base`}>Post</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CreatePost;
