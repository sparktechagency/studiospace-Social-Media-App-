

import { PostHeaderProps } from '@/lib/types/type';

import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';
import FeedBackModal from '../modals/FeedBackModal';

import ReportDetailsModal from '../modals/ReportDetailsModal';
import ReportModal from '../modals/ReportModal';


// --- Report Modal Component ---


// --- Main PostHeader Component ---
export const PostHeader: React.FC<PostHeaderProps> = ({ user, isFollowing }) => {
    const [optionsModalVisible, setOptionsModalVisible] = useState(false);
    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [reportedDetailsModalVisible, setReportedDetailsModalVisible] = useState(false);
    const [connected, setConnected] = useState(false);
    const [ReportedReson, setReportedReson] = useState('');
    const handleOptionPress = (option: string) => {
        setOptionsModalVisible(false);
        if (option === 'Report Post') {
            setTimeout(() => setReportModalVisible(true), 400);
        } else {
            console.log(`${option} pressed for user ${user.name}`);
        }
    };

    const handleReportSubmit = (reason: string) => {
        console.log(`Post reported for: ${reason}`);
        setReportedReson(reason);
        setReportModalVisible(false);
        setTimeout(() => setReportedDetailsModalVisible(true), 400);
    };

    return (
        <View style={tw`flex-row justify-between items-start p-4`}>
            {/* Post Options Modal */}
            <FeedBackModal
                visible={optionsModalVisible}
                onClose={() => setOptionsModalVisible(false)}
                onOptionPress={handleOptionPress}
                userName={user.name}
            />

            {/* Report Modal */}
            <ReportModal
                visible={reportModalVisible}
                onClose={() => setReportModalVisible(false)}
                onReportSubmit={handleReportSubmit}
            />

            <ReportDetailsModal
                visible={reportedDetailsModalVisible}
                onClose={() => setReportedDetailsModalVisible(false)}
                reportedReson={ReportedReson}
                onSubmit={() => setReportedDetailsModalVisible(false)}
            />

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
                <TouchableOpacity onPress={() => setOptionsModalVisible(true)}>
                    <MaterialIcon name="more-vert" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};
