import tw from '@/lib/tailwind';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// --- Type Definitions ---
interface FAQ {
    id: string;
    question: string;
    answer: string;
}

// --- Reusable Components ---

const Header: React.FC = () => (
    <View style={tw`bg-[#3A3E41] p-4 pt-12 flex-row items-center`}>
        <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <View style={tw`flex-1`}>
            <Text style={tw`text-white text-xl font-bold text-center`}>Help & Support</Text>
        </View>
        <View style={tw`w-6`} />{/* Spacer */}
    </View>
);

const FAQItem: React.FC<{ item: FAQ }> = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <View style={tw`border-b border-gray-700`}>
            <TouchableOpacity
                style={tw`flex-row justify-between items-center py-4`}
                onPress={() => setIsExpanded(!isExpanded)}
            >
                <Text style={tw`text-white text-base font-semibold w-[90%]`}>{item.question}</Text>
                <Icon name={isExpanded ? "chevron-up" : "chevron-down"} size={16} color="white" />
            </TouchableOpacity>
            {isExpanded && (
                <View style={tw`pb-4`}>
                    <Text style={tw`text-gray-300`}>{item.answer}</Text>
                </View>
            )}
        </View>
    );
};

const ContactSupportCard: React.FC = () => (
    <View style={tw`bg-[#3A3E41] p-4 rounded-lg`}>
        <Text style={tw`text-white text-xl font-bold mb-4`}>Contact Support</Text>
        <TouchableOpacity style={tw`flex-row items-center gap-4`}>
            <Icon name="envelope" size={24} color="white" />
            <View>
                <Text style={tw`text-white font-semibold`}>Email Support</Text>
                <Text style={tw`text-gray-400 text-xs`}>Support@gmail.com</Text>
            </View>
        </TouchableOpacity>
    </View>
);


// --- Main Help & Support Screen ---
const HelpAndSupportScreen = () => {
    const faqs: FAQ[] = [
        { id: '1', question: 'How do I reset my password?', answer: 'You can reset your password by going to the login screen and tapping on "Forgot Password".' },
        { id: '2', question: 'How do I update my profile information?', answer: 'Navigate to your profile and tap the "Edit Profile" button to make changes.' },
        { id: '3', question: 'How can I report a user or a post?', answer: 'Tap the three-dot menu on a post or profile to find the report option.' },
        { id: '4', question: 'Where can I find my saved items?', answer: 'Your saved posts and jobs are located in the "Saved" section of your profile menu.' },
    ];

    return (
        <View style={tw`flex-1 bg-[#0F0E13]`}>
            <Header />
            <View style={tw`p-4`}>
                <View style={tw`bg-[#3A3E41] p-4 rounded-lg mb-6`}>
                    <Text style={tw`text-white text-xl font-bold mb-2`}>Frequently Asked Questions</Text>
                    <FlatList
                        data={faqs}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <FAQItem item={item} />}
                        scrollEnabled={false} // Disable FlatList scrolling inside a ScrollView
                    />
                </View>

                <ContactSupportCard />
            </View>
        </View>
    );
};

export default HelpAndSupportScreen;
