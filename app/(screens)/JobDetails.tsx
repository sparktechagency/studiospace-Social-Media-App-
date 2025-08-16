import { menuicon, message, notification } from '@/assets/icon/Icon';
import tw from '@/lib/tailwind';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// --- Reusable Components ---

const Header: React.FC = () => (
    <View style={tw`bg-[#3A3E41] p-4 pt-12`}>
        <View style={tw`flex-row justify-between items-center`}>
            <TouchableOpacity>
                <SvgXml xml={menuicon} />
            </TouchableOpacity>
            <View style={tw`flex-1 flex-row items-center bg-[#1A1C20] rounded mx-4 px-3`}>
                <Icon name="search" size={18} color="#989898" />
                <TextInput
                    placeholder="Search jobs, companies"
                    placeholderTextColor="#989898"
                    style={tw`text-white p-2 text-base w-full`}
                />
            </View>
            <View style={tw`flex-row items-center gap-4`}>
                <TouchableOpacity style={tw`relative`}>
                    <SvgXml xml={notification} />
                    <View style={tw`absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full`} />
                </TouchableOpacity>
                <TouchableOpacity style={tw`relative`}>
                    <SvgXml xml={message} />
                    <View style={tw`absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full`} />
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

const JobSection: React.FC<{ title: string; content: string[] }> = ({ title, content }) => (
    <View style={tw`mb-6`}>
        <Text style={tw`text-white text-lg font-bold mb-2`}>{title}</Text>
        {content.map((point, index) => (
            <Text key={index} style={tw`text-gray-300 text-sm`}>• {point}</Text>
        ))}
    </View>
);

// --- Main Job Details Screen ---
const JobDetailsScreen = () => {
    const [isSaved, setIsSaved] = useState(false);

    const jobData = {
        title: "Frontend Developer (React)",
        company: "TechSolutions",
        location: "New York, NY",
        logo: "https://placehold.co/96x96/EFEFEF/3A3E41?text=T",
        description: "We are looking for a skilled Frontend Developer who is proficient in React. You will be responsible for building the client-side of our web applications.",
        responsibilities: [
            "Developing new user-facing features using React.js.",
            "Building reusable components and front-end libraries for future use.",
            "Translating designs and wireframes into high-quality code."
        ],
        qualifications: [
            "Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model.",
            "Thorough understanding of React.js and its core principles.",
            "Experience with popular React.js workflows (such as Flux or Redux)."
        ],
        about: "TechSolutions provides cutting-edge software solutions for businesses of all sizes."
    };

    return (
        <View style={tw`flex-1 bg-[#0F0E13]`}>
            <Header />
            <ScrollView contentContainerStyle={tw`p-4`}>
                {/* --- Job Summary --- */}
                <View style={tw`items-center text-center mb-6`}>
                    <Image source={require('../../assets/images/logo.png')} style={tw`w-24 h-24 rounded-full mb-4`} />
                    <Text style={tw`text-white text-xl font-bold`}>{jobData.title}</Text>
                    <Text style={tw`text-gray-300 text-sm`}>{jobData.company} · {jobData.location}</Text>
                </View>

                {/* --- Action Buttons --- */}
                <View style={tw`flex-row justify-center items-center gap-4 mb-8`}>
                    <TouchableOpacity onPress={() => router.push("/(screens)/JobApply")} style={tw`bg-[#4593F5] py-2 px-6 rounded-full border border-white`}>
                        <Text style={tw`text-white font-bold text-sm`}>Apply Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={tw`p-2 rounded-lg border border-gray-500`}
                        onPress={() => setIsSaved(!isSaved)}
                    >
                        <MaterialIcon name={isSaved ? "bookmark" : "bookmark-border"} size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* --- Job Details --- */}
                <JobSection title="Job Description" content={[jobData.description]} />
                <JobSection title="Responsibilities" content={jobData.responsibilities} />
                <JobSection title="Qualifications" content={jobData.qualifications} />
                <JobSection title="About TechSolutions" content={[jobData.about]} />

            </ScrollView>
        </View>
    );
};

export default JobDetailsScreen;
