import tw from '@/lib/tailwind';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/ui/Header';

// --- Type Definitions ---
interface Conversation {
    id: string;
    name: string;
    lastMessage: string;
    timestamp: string;
    avatar: string;
    isOnline?: boolean;
    isUnread?: boolean;
}

// --- Reusable Components ---


const ConversationItem: React.FC<{ conversation: Conversation }> = ({ conversation }) => (
    <TouchableOpacity onPress={() => router.push(`/Chat_details`)} style={tw`flex-row items-center p-3`}>
        <View style={tw`relative`}>
            <Image source={require('../../assets/images/avater/avater2.png')} style={tw`w-12 h-12 rounded-full`} />
            {conversation.isOnline && <View style={tw`absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#3A3E41]`} />}
        </View>
        <View style={tw`flex-1 ml-4`}>
            <View style={tw`flex-row justify-between items-center`}>
                <Text style={tw`text-white text-base font-bold`}>{conversation.name}</Text>
                <Text style={tw`text-gray-400 text-xs`}>{conversation.timestamp}</Text>
            </View>
            <View style={tw`flex-row justify-between items-center`}>
                <Text style={tw`text-gray-300 text-sm`} numberOfLines={1}>{conversation.lastMessage}</Text>
                {conversation.isUnread && <View style={tw`w-2.5 h-2.5 bg-blue-500 rounded-full`} />}
            </View>
        </View>
    </TouchableOpacity>
);

// --- Main Messages Screen ---
const MessagesScreen = () => {
    const [activeTab, setActiveTab] = useState('Messages');

    const messages: Conversation[] = [
        { id: '1', name: 'Harry', lastMessage: 'Hi there! What’s new?', timestamp: '1:45 am', avatar: 'https://placehold.co/50x50/EFEFEF/3A3E41?text=H', isOnline: true, isUnread: true },
        { id: '2', name: 'Mehedi', lastMessage: 'Hi Sir do you have .....', timestamp: '11:00 am', avatar: 'https://placehold.co/50x50/EFEFEF/3A3E41?text=M', isOnline: false },
        { id: '3', name: 'Nota', lastMessage: 'Hi there! What’s new?', timestamp: '1:45 am', avatar: 'https://placehold.co/50x50/EFEFEF/3A3E41?text=N', isOnline: true },
        { id: '4', name: 'Jack', lastMessage: 'Hi there! What’s new?', timestamp: '1:45 am', avatar: 'https://placehold.co/50x50/EFEFEF/3A3E41?text=J', isOnline: true },
    ];

    const requests: Conversation[] = [
        { id: '5', name: 'Request User 1', lastMessage: 'Wants to connect.', timestamp: 'Yesterday', avatar: 'https://placehold.co/50x50/EFEFEF/3A3E41?text=R1' },
    ];

    const dataToShow = activeTab === 'Messages' ? messages : requests;

    return (
        <View style={tw`flex-1 bg-[#0F0E13]`}>
            <Header searchPlaceholder='Search by name' searchStatus />
            <View style={tw`flex-row justify-between items-center p-4`}>
                <TouchableOpacity onPress={() => setActiveTab('Messages')}>
                    <Text style={tw`text-xl font-bold ${activeTab === 'Messages' ? 'text-white' : 'text-gray-500'}`}>Messages</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Requests')}>
                    <Text style={tw`text-xl font-semibold ${activeTab === 'Requests' ? 'text-[#1778F2]' : 'text-gray-500'}`}>Requests</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={dataToShow}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ConversationItem conversation={item} />}
                ItemSeparatorComponent={() => <View style={tw`h-px bg-gray-700 mx-4`} />}
            />
        </View>
    );
};

export default MessagesScreen;
