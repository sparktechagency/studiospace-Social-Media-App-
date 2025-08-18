import tw from '@/lib/tailwind';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/ui/Header';

// --- Type Definitions ---
type NotificationType = 'like' | 'job_recommendation' | 'profile_view' | 'new_position';

interface Notification {
    id: string;
    type: NotificationType;
    user: {
        name: string;
        avatar: string;
    };
    content?: string;
    timestamp: string;
    isRead: boolean;
}

// --- Reusable Components ---


const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
    const renderContent = () => {
        switch (notification.type) {
            case 'job_recommendation':
                return (
                    <View>
                        <Text style={tw`text-white text-sm`}>
                            <Text style={tw`font-bold`}>{notification.user.name}</Text> is looking for: Director of Sales Development. see this and 10 other jobs Recommendations
                        </Text>
                        <TouchableOpacity onPress={() => router.push('/JobDetails')} style={tw`mt-2 self-start py-2 px-4 rounded-md border-2 border-[#4593F5]`}>
                            <Text style={tw`text-[#4593F5] font-bold`}>Show Jobs</Text>
                        </TouchableOpacity>
                    </View>
                );
            case 'profile_view':
                return (
                    <View>
                        <Text style={tw`text-white font-bold text-lg`}>{notification.user.name} viewed your profile</Text>
                        <TouchableOpacity style={tw`mt-2 self-start py-2 px-4 rounded-md border-2 border-[#4593F5]`}>
                            <Text style={tw`text-[#4593F5] font-bold`}>Show all views</Text>
                        </TouchableOpacity>
                    </View>
                );
            default:
                return (
                    <Text style={tw`text-white text-sm`}>
                        <Text style={tw`font-bold`}>{notification.user.name}</Text> {notification.content}
                    </Text>
                );
        }
    };

    return (
        <TouchableOpacity style={tw`bg-[#35393C] p-3 border-b border-gray-700`}>
            <View style={tw`flex-row items-start gap-4`}>
                <Image source={require('../../assets/images/avater/avater2.png')} style={tw`w-12 h-12 rounded-full`} />
                <View style={tw`flex-1`}>
                    {renderContent()}
                </View>
                <Text style={tw`text-gray-400 text-xs`}>{notification.timestamp}</Text>
            </View>
        </TouchableOpacity>
    );
};


// --- Main Notification Screen ---
const NotificationScreen = () => {
    const recentNotifications: Notification[] = [
        { id: '1', type: 'like', user: { name: 'Harry', avatar: 'https://placehold.co/50x50/EFEFEF/3A3E41?text=H' }, content: 'likes your post', timestamp: '10m', isRead: false },
        { id: '2', type: 'job_recommendation', user: { name: 'Harry', avatar: 'https://placehold.co/50x50/EFEFEF/3A3E41?text=H' }, timestamp: '30m', isRead: false },
    ];

    const earlierNotifications: Notification[] = [
        { id: '3', type: 'new_position', user: { name: 'Harry', avatar: 'https://placehold.co/50x50/EFEFEF/3A3E41?text=H' }, content: 'Starting a new position as UI/UX designer', timestamp: '1d', isRead: true },
        { id: '4', type: 'profile_view', user: { name: 'Harry', avatar: 'https://placehold.co/50x50/EFEFEF/3A3E41?text=H' }, timestamp: '2d', isRead: true },
        { id: '5', type: 'new_position', user: { name: 'Sarah Chen', avatar: 'https://placehold.co/50x50/EFEFEF/3A3E41?text=SC' }, content: 'Starting a new position as Product Designer', timestamp: '1d', isRead: true },
        { id: '6', type: 'profile_view', user: { name: 'John Doe', avatar: 'https://placehold.co/50x50/EFEFEF/3A3E41?text=JD' }, timestamp: '2d', isRead: true },
    ];

    const renderListHeader = () => (
        <View>
            <Text style={tw`text-white text-xl font-bold p-4`}>Recent</Text>
            {recentNotifications.map(item => <NotificationItem key={item.id} notification={item} />)}
            <Text style={tw`text-white text-xl font-bold p-4 mt-4`}>Earlier</Text>
        </View>
    );

    return (
        <View style={tw`flex-1 bg-[#0F0E13]`}>
            <Header searchStatus searchPlaceholder='Search notifications' />
            <FlatList
                data={earlierNotifications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <NotificationItem notification={item} />}
                ListHeaderComponent={renderListHeader}
            />
        </View>
    );
};

export default NotificationScreen;
