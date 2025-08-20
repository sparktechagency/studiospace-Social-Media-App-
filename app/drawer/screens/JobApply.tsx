import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';

// --- Type Definitions ---
interface SelectedFile {
    uri: string;
    name: string;
    type?: string;
}

// --- Reusable Components ---

const Header: React.FC<{ title: string }> = ({ title }) => (
    <View style={tw`bg-[#3A3E41] p-4 pt-12 flex-row items-center`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`pr-4`}>
            <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-bold text-center flex-1`}>{title}</Text>
        <View style={tw`w-6`} />{/* Spacer */}
    </View>
);

const FileUploadSection: React.FC<{ onFileSelect: (file: SelectedFile) => void; selectedFile: SelectedFile | null }> = ({ onFileSelect, selectedFile }) => {
    const handlePress = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
            });

            if (!result.canceled && result.assets) {
                const asset = result.assets[0];
                onFileSelect({ uri: asset.uri, name: asset.name, type: asset.mimeType });
            }
        } catch (err) {
            console.error('Error picking document:', err);
        }
    };

    return (
        <View style={tw`bg-[#3A3E41] p-4 rounded-lg`}>
            <Text style={tw`text-white text-xl font-bold mb-3`}>Resume/CV</Text>
            <TouchableOpacity
                style={tw`border-2 border-dashed border-[#1778F2] rounded-lg h-40 items-center justify-center p-4`}
                onPress={handlePress}
            >
                <Icon name="upload" size={40} color="#4593F5" />
                {selectedFile ? (
                    <Text style={tw`text-green-400 text-center mt-2`}>{selectedFile.name}</Text>
                ) : (
                    <Text style={tw`text-white text-center mt-2 text-sm`}>
                        Click to upload or drag and drop{'\n'}PDF, DOCX (MAX. 5MB)
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const CoverLetterSection: React.FC<{ value: string; onChangeText: (text: string) => void }> = ({ value, onChangeText }) => (
    <View style={tw`bg-[#3A3E41] p-4 rounded-lg`}>
        <Text style={tw`text-white text-xl font-bold mb-3`}>Cover Letter (optional)</Text>
        <TextInput
            style={tw`bg-[#0F0E13] border border-gray-600 rounded p-3 h-40 text-white`}
            placeholder="Write your cover letter here..."
            placeholderTextColor="#989898"
            multiline
            textAlignVertical="top"
            value={value}
            onChangeText={onChangeText}
        />
    </View>
);


// --- Main Job Apply Screen ---
const JobApplyScreen = () => {
    const [coverLetter, setCoverLetter] = useState('');
    const [resume, setResume] = useState<SelectedFile | null>(null);

    const handleApply = () => {
        if (!resume) {
            Alert.alert("Resume Required", "Please upload your resume/CV to apply.");
            return;
        }

        console.log("--- Submitting Application ---");
        console.log("Resume:", resume);
        console.log("Cover Letter:", coverLetter);

        // In a real app, you would upload the files and submit the data here.

        Alert.alert(
            "Application Submitted!",
            "Your application for the Frontend Developer position has been sent successfully.",
            [{ text: "OK" }]
        );
    };

    return (
        <View style={tw`flex-1 bg-[#0F0E13]`}>
            <Header title="Applying for Frontend" />

            <ScrollView contentContainerStyle={tw`p-4 gap-6`}>
                <FileUploadSection onFileSelect={setResume} selectedFile={resume} />
                <CoverLetterSection value={coverLetter} onChangeText={setCoverLetter} />
            </ScrollView>

            <View style={tw`p-4 border-t border-gray-700`}>
                <TouchableOpacity style={tw`bg-[#1778F2] py-3 rounded-lg`} onPress={handleApply}>
                    <Text style={tw`text-white text-center font-bold text-base`}>Apply Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default JobApplyScreen;
