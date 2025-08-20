import { imageAssets } from '@/assets/images/image';
import tw from '@/lib/tailwind';
import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../../components/ui/Header';

// --- Type Definitions ---
interface User {
    id: string;
    name: string;
    title: string;
    avatar: string;
    mutualConnections?: number;
    timestamp: string;
    isOnline?: boolean;
}

// --- Reusable Components ---


const ViewerCard: React.FC<{ user: User }> = ({ user }) => {
    const [action, setAction] = useState<'connect' | 'message'>('connect');

    const handlePress = () => {
        setAction(current => current === 'connect' ? 'message' : 'connect');
    };

    return (
        <View style={tw`bg-[#3A3E41] p-3 mb-2 rounded-lg flex-row justify-between items-center`}>
            <View style={tw`flex-row items-center gap-4`}>
                <View style={tw`relative`}>
                    <Image source={imageAssets.avater} style={tw`w-12 h-12 rounded-full`} />
                    {user.isOnline && <View style={tw`absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#3A3E41]`} />}
                </View>
                <View>
                    <Text style={tw`text-white text-lg font-bold`}>{user.name}</Text>
                    <Text style={tw`text-gray-300 text-sm`}>{user.title}</Text>
                    {user.mutualConnections && <Text style={tw`text-gray-400 text-xs`}>{user.mutualConnections} mutual connections</Text>}
                    <Text style={tw`text-green-400 text-xs`}>{user.timestamp}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={tw`py-2 px-3 rounded-full border border-white flex-row items-center gap-2 ${action === 'connect' ? 'bg-[#4593F5]' : ''}`}
                onPress={handlePress}
            >
                <Icon name={action === 'connect' ? 'user-plus' : 'envelope'} size={14} color="white" />
                <Text style={tw`text-white font-bold text-xs`}>{action === 'connect' ? 'Connect' : 'Message'}</Text>
            </TouchableOpacity>
        </View>
    );
};


// --- Main Profile Viewers Screen ---
const ProfileViewersScreen = () => {
    const viewers: User[] = [
        { id: '1', name: 'Jordan Lee', title: 'Product Designer', avatar: 'https://placehold.co/50x50/EFEFEF/3A3E41?text=JL', mutualConnections: 5, timestamp: 'Today, 9:15 AM', isOnline: true },
        { id: '2', name: 'Sarah Chen', title: 'Product Designer', avatar: 'https://placehold.co/50x50/EFEFEF/3A3E41?text=SC', mutualConnections: 5, timestamp: 'Yesterday, 8:25 PM', isOnline: false },
        { id: '3', name: 'Alex Ray', title: 'Frontend Developer', avatar: 'https://placehold.co/50x50/EFEFEF/3A3E41?text=AR', mutualConnections: 3, timestamp: '2 days ago', isOnline: true },
        { id: '4', name: 'John Doe', title: 'Software Engineer', avatar: 'https://placehold.co/50x50/EFEFEF/3A3E41?text=JD', mutualConnections: 8, timestamp: '3 days ago', isOnline: false },
    ];

    return (
        <View style={tw`flex-1 bg-[#0F0E13]`}>
            <Header searchStatus={false} title='Profile Viewers' />
            <FlatList
                data={viewers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ViewerCard user={item} />}
                contentContainerStyle={tw`p-4`}
            />
        </View>
    );
};

export default ProfileViewersScreen;
