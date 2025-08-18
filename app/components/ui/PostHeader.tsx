

import { PostHeaderProps } from '@/lib/types/type';

import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';

import { router } from 'expo-router';


// --- Report Modal Component ---


// --- Main PostHeader Component ---
export const PostHeader: React.FC<PostHeaderProps> = ({ user, isFollowing }) => {
    const [connected, setConnected] = useState(false);

    return (
        <View style={tw`flex-row justify-between items-start p-4`}>


            <View style={tw`flex-row items-center gap-3`}>
                <Image source={require('../../../assets/images/avater/avater3.png')} style={tw`w-14 h-14 rounded-full`} />
                <View>
                    <Text style={tw`text-white text-base font-bold`}>{user.name}</Text>
                    <Text style={tw`text-gray-400 text-xs`}>{user.title}</Text>
                    <View style={tw`flex-row items-center gap-1 mt-1`}>
                        <Text style={tw`text-gray-500 text-xs`}>• {user.time} •</Text>
                        {isFollowing && <Text style={tw`text-gray-400 text-xs`}>Following</Text>}
                    </View>
                </View>
            </View>
            <View style={tw`flex-row items-center gap-1`}>
                <TouchableOpacity onPress={() => setConnected(!connected)}>
                    <Text style={tw`text-blue-400 text-base`}>{connected ? 'Pending' : 'Connect'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push(`/modals/feedback_modal`)}>
                    <MaterialIcon name="more-vert" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};
