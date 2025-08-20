import tw from '@/lib/tailwind';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// --- Type Definitions ---
type JobType = "Full-Time" | "Part-Time" | "Contract" | "Internship";
type ArtCategory = "Painting" | "Nail Art" | "Dancing" | "Music";

// --- Reusable Components ---

const Header: React.FC<{ onPreview: () => void }> = ({ onPreview }) => (
    <View style={tw`bg-[#3A3E41] p-4 pt-12 flex-row justify-between items-center`}>
        <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-bold`}>Post a Job</Text>
        <TouchableOpacity style={tw`bg-[#4593F5] py-1 px-3 rounded-md flex-row items-center gap-2`} onPress={onPreview}>
            <Icon name="eye" size={16} color="white" />
            <Text style={tw`text-white font-semibold text-xs`}>Preview</Text>
        </TouchableOpacity>
    </View>
);

const FormInput: React.FC<{ label: string; placeholder: string; value: string; onChangeText: (text: string) => void; multiline?: boolean; icon?: string }> = ({ label, placeholder, value, onChangeText, multiline, icon }) => (
    <View style={tw`mb-4`}>
        <Text style={tw`text-white font-bold mb-2 text-sm`}>{label}</Text>
        <View style={tw`flex-row items-center bg-[#0F0E13] border border-gray-600 rounded-md px-3 ${multiline ? 'h-20' : 'h-10'}`}>
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

const PickerModal: React.FC<{ visible: boolean; onClose: () => void; options: string[]; onSelect: (option: string) => void; title: string }> = ({ visible, onClose, options, onSelect, title }) => (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
        <TouchableOpacity style={tw`flex-1 justify-end bg-black bg-opacity-50`} onPress={onClose} activeOpacity={1}>
            <View style={tw`bg-[#3A3E41] rounded-t-2xl`}>
                <Text style={tw`text-white text-lg font-bold text-center p-4`}>{title}</Text>
                {options.map(option => (
                    <TouchableOpacity key={option} style={tw`py-3 border-t border-gray-700`} onPress={() => { onSelect(option); onClose(); }}>
                        <Text style={tw`text-white text-center text-base`}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </TouchableOpacity>
    </Modal>
);

// --- Main Post a Job Screen ---
const PostAJobScreen = () => {
    const [jobDetails, setJobDetails] = useState({
        title: '',
        category: '',
        jobType: '',
        location: '',
        deadline: '',
        description: '',
        skills: '',
        budget: '',
    });
    const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
    const [isJobTypeModalVisible, setJobTypeModalVisible] = useState(false);

    const handleInputChange = (field: keyof typeof jobDetails, value: string) => {
        setJobDetails(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        console.log("--- Submitting Job Post ---", jobDetails);
        Alert.alert("Job Posted", "Your job has been successfully posted.");
    };

    return (
        <View style={tw`flex-1 bg-[#0F0E13]`}>
            <Header onPreview={() => Alert.alert("Preview", "Showing a preview of the job post.")} />
            <ScrollView contentContainerStyle={tw`p-4`}>
                <View style={tw`bg-[#3A3E41] p-4 rounded-lg`}>
                    <FormInput label="Job Title" placeholder="e.g., Concept Artist" value={jobDetails.title} onChangeText={text => handleInputChange('title', text)} />

                    <View style={tw`mb-4`}>
                        <Text style={tw`text-white font-bold mb-2 text-sm`}>Art Category</Text>
                        <TouchableOpacity style={tw`flex-row items-center bg-[#0F0E13] border border-gray-600 rounded-md px-3 h-10`} onPress={() => setCategoryModalVisible(true)}>
                            <Icon name="tag" size={16} color="#989898" />
                            <Text style={tw`text-white ml-2`}>{jobDetails.category || 'Select a Category'}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={tw`mb-4`}>
                        <Text style={tw`text-white font-bold mb-2 text-sm`}>Job Type</Text>
                        <TouchableOpacity style={tw`flex-row items-center bg-[#0F0E13] border border-gray-600 rounded-md px-3 h-10`} onPress={() => setJobTypeModalVisible(true)}>
                            <Icon name="briefcase" size={16} color="#989898" />
                            <Text style={tw`text-white ml-2`}>{jobDetails.jobType || 'Select a Job type'}</Text>
                        </TouchableOpacity>
                    </View>

                    <FormInput label="Location" placeholder="e.g., San Francisco, CA" value={jobDetails.location} onChangeText={text => handleInputChange('location', text)} icon="map-marker" />
                    <FormInput label="Application Deadline" placeholder="mm/dd/yyyy" value={jobDetails.deadline} onChangeText={text => handleInputChange('deadline', text)} icon="calendar" />
                    <FormInput label="Job Description" placeholder="Describe the responsibility, req, expectation" value={jobDetails.description} onChangeText={text => handleInputChange('description', text)} multiline />
                    <FormInput label="Required Skills (optional)" placeholder="Add a skill and press Enter" value={jobDetails.skills} onChangeText={text => handleInputChange('skills', text)} />
                    <FormInput label="Budget (optional)" placeholder="e.g., $500 - $1000" value={jobDetails.budget} onChangeText={text => handleInputChange('budget', text)} />
                </View>

                <TouchableOpacity style={tw`bg-[#1778F2] py-3 rounded-md mt-6`} onPress={handleSubmit}>
                    <Text style={tw`text-white text-center font-bold text-base`}>Submit Job Post</Text>
                </TouchableOpacity>
            </ScrollView>

            <PickerModal
                visible={isCategoryModalVisible}
                onClose={() => setCategoryModalVisible(false)}
                options={["Painting", "Nail Art", "Dancing", "Music"]}
                onSelect={option => handleInputChange('category', option)}
                title="Select a Category"
            />
            <PickerModal
                visible={isJobTypeModalVisible}
                onClose={() => setJobTypeModalVisible(false)}
                options={["Full-Time", "Part-Time", "Contract", "Internship"]}
                onSelect={option => handleInputChange('jobType', option)}
                title="Select a Job Type"
            />
        </View>
    );
};

export default PostAJobScreen;
