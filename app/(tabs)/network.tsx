import { menuicon, message, notification } from '@/assets/icon/Icon';
import tw from '@/lib/tailwind';
import React, { useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';

// --- Type Definitions ---
interface User {
    id: string;
    name: string;
    title: string;
    avatar: string;
    mutualConnections?: number;
    context?: string; // e.g., "Viewed your profile 2 hours ago"
    isOnline?: boolean;
}

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
                    placeholder="Search by name"
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

const NetworkTabs: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
    const tabs = ["Connections", "Discover Network", "Requests", "Visitors"];

    return (
        <View style={tw`flex-row items-center gap-2 px-4 py-3`}>
            {tabs.map(tab => (
                <TouchableOpacity
                    key={tab}
                    style={tw`p-2 rounded-md border border-gray-500 ${activeTab === tab ? 'bg-[#3A3E41]' : ''}`}
                    onPress={() => setActiveTab(tab)}
                >
                    <Text style={tw`text-white text-xs font-semibold`}>{tab}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const UserCard: React.FC<{ user: User }> = ({ user }) => {
    const [isConnected, setIsConnected] = useState(false);

    return (
        <View style={tw`bg-[#3A3E41] rounded-xl p-3 mb-3`}>
            <View style={tw`flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center gap-4`}>
                    <View style={tw`relative`}>
                        <Image source={require('../../assets/images/avater/avater2.png')} style={tw`w-12 h-12 rounded-full`} />
                        {user.isOnline && <View style={tw`absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#3A3E41]`} />}
                    </View>
                    <View style={tw`w-48`}>
                        <Text style={tw`text-white text-lg font-bold`}>{user.name}</Text>
                        <Text style={tw`text-gray-300 text-sm`}>{user.title}</Text>
                        {user.mutualConnections && <Text style={tw`text-gray-400 text-xs`}>{user.mutualConnections} mutual connections</Text>}
                        {user.context && <Text style={tw`text-green-400 text-xs`}>{user.context}</Text>}
                    </View>
                </View>
                <TouchableOpacity
                    style={tw`bg-[#4593F5] py-2 px-3 rounded-full border border-white`}
                    onPress={() => setIsConnected(!isConnected)}
                >
                    <Text style={tw`text-white font-bold text-xs`}>{isConnected ? 'Connected' : 'Connect'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const ConnectionRequestCard: React.FC<{ user: User; onRespond: (id: string, accepted: boolean) => void }> = ({ user, onRespond }) => (
    <View style={tw`bg-[#3A3E41] rounded-xl p-3 mb-3`}>
        <View style={tw`flex-row items-center gap-4`}>
            <Image source={require('../../assets/images/avater/avater3.png')} style={tw`w-12 h-12 rounded-full`} />
            <View style={tw`flex-1`}>
                <Text style={tw`text-white text-lg font-bold`}>{user.name}</Text>
                <Text style={tw`text-gray-300 text-sm`}>{user.title}</Text>
            </View>
        </View>
        <View style={tw`flex-row justify-end gap-3 mt-3`}>
            <TouchableOpacity style={tw`py-2 px-4 rounded-full border border-gray-500`} onPress={() => onRespond(user.id, false)}>
                <Text style={tw`text-white font-bold text-xs`}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`bg-[#4593F5] py-2 px-4 rounded-full border border-white`} onPress={() => onRespond(user.id, true)}>
                <Text style={tw`text-white font-bold text-xs`}>Accept</Text>
            </TouchableOpacity>
        </View>
    </View>
);


// --- Main Network Screen ---
const MyNetworkScreen = () => {
    const [activeTab, setActiveTab] = useState('Visitors');

    // --- Mock Data for each tab ---
    const [connections, setConnections] = useState<User[]>([
        { id: 'c1', name: 'Alice Johnson', title: 'Lead Developer', avatar: '../../assets/images/avater/avater2.png', isOnline: true },
        { id: 'c2', name: 'Charlie Brown', title: 'UX Designer', avatar: '../../assets/images/avater/avater2.png', isOnline: false },
        { id: 'c3', name: 'Diana Prince', title: 'Project Manager', avatar: '../../assets/images/avater/avater2.png', isOnline: true },
    ]);
    const [discover, setDiscover] = useState<User[]>([
        { id: 'd1', name: 'Jordan Lee', title: 'Product Designer at Figma', avatar: '../../assets/images/avater/avater2.png', mutualConnections: 5, isOnline: true },
        { id: 'd2', name: 'Alex Ray', title: 'Frontend Developer', avatar: '../../assets/images/avater/avater2.png', mutualConnections: 3, isOnline: true },
        { id: 'd3', name: 'Sam Wilson', title: 'Mobile Engineer', avatar: '../../assets/images/avater/avater2.png', mutualConnections: 8, isOnline: false },
    ]);
    const [requests, setRequests] = useState<User[]>([
        { id: 'r1', name: 'Bob Williams', title: 'Data Scientist', avatar: '../../assets/images/avater/avater2.png' },
        { id: 'r2', name: 'Eve Adams', title: 'Marketing Head', avatar: '../../assets/images/avater/avater2.png' },
    ]);
    const [visitors, setVisitors] = useState<User[]>([
        { id: 'v1', name: 'Sarah Chen', title: 'Product Designer at Figma', avatar: '../../assets/images/avater/avater2.png', context: 'Viewed your profile 2 hours ago', isOnline: true },
        { id: 'v2', name: 'John Doe', title: 'Software Engineer at Google', avatar: '../../assets/images/avater/avater2.png', context: 'Viewed your profile 1 day ago', isOnline: false },
        { id: 'v3', name: 'Frank Miller', title: 'CEO at Acme Corp', avatar: '../../assets/images/avater/avater2.png', context: 'Viewed your profile 3 days ago', isOnline: true },
    ]);

    const handleRequestResponse = (id: string, accepted: boolean) => {
        const request = requests.find(r => r.id === id);
        if (!request) return;

        if (accepted) {
            setConnections(prev => [...prev, { ...request, isOnline: true }]);
        }
        setRequests(prev => prev.filter(r => r.id !== id));
    };

    // This function now returns the entire FlatList for the active tab, which resolves the typing issue.
    const renderContent = () => {
        switch (activeTab) {
            case "Connections":
                return <FlatList
                    data={connections}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <UserCard user={item} />}
                    ListHeaderComponent={<Text style={tw`text-white font-semibold mb-2`}>Your Connections</Text>}
                    contentContainerStyle={tw`px-4 mt-4`}
                    ListEmptyComponent={<Text style={tw`text-gray-400 text-center mt-10`}>No connections yet.</Text>}
                />;
            case "Discover Network":
                return <FlatList
                    data={discover}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <UserCard user={item} />}
                    ListHeaderComponent={<Text style={tw`text-white font-semibold mb-2`}>People You May Know</Text>}
                    contentContainerStyle={tw`px-4 mt-4`}
                />;
            case "Requests":
                return <FlatList
                    data={requests}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ConnectionRequestCard user={item} onRespond={handleRequestResponse} />}
                    ListHeaderComponent={<Text style={tw`text-white font-semibold mb-2`}>Connection Requests</Text>}
                    contentContainerStyle={tw`px-4 mt-4`}
                    ListEmptyComponent={<Text style={tw`text-gray-400 text-center mt-10`}>No pending requests.</Text>}
                />;
            case "Visitors":
                return <FlatList
                    data={visitors}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <UserCard user={item} />}
                    ListHeaderComponent={<Text style={tw`text-white font-semibold mb-2`}>Recent Profile Visitors</Text>}
                    contentContainerStyle={tw`px-4 mt-4`}
                />;
            default:
                return null;
        }
    };

    return (
        <View style={tw`flex-1 bg-[#0F0E13]`}>
            <Header />
            <View style={tw`p-4`}>
                <Text style={tw`text-white text-xl font-bold`}>My Network</Text>
            </View>
            <NetworkTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {renderContent()}
        </View>
    );
};

export default MyNetworkScreen;
