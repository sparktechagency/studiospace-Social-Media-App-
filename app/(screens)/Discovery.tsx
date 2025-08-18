import tw from '@/lib/tailwind';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/ui/Header';

// --- Type Definitions ---
interface DiscoveryItem {
    id: string;
    imageUrl: string;
    category: 'Painting' | 'Nail Art' | 'Dancing' | 'Music';
    aspectRatio: number; // To maintain image dimensions
}

// --- Reusable Components ---



const FilterTabs: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
    const tabs = ["All", "Painting", "Nail Art", "Dancing", "Music"];
    return (
        <ScrollView horizontal contentContainerStyle={tw`px-4 py-3 gap-2 h-[55px] `}>
            {tabs.map(tab => (
                <TouchableOpacity
                    key={tab}
                    style={tw`py-1.5 px-4 rounded-md border ${activeTab === tab ? 'bg-[#3A3E41] border-[#3A3E41]' : 'border-gray-500'}`}
                    onPress={() => setActiveTab(tab)}
                >
                    <Text style={tw`text-white text-xs font-semibold`}>{tab}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const DiscoveryCard: React.FC<{ item: DiscoveryItem }> = ({ item }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    return (
        <View style={tw`relative w-[163px] mb-4 border border-gray-600 rounded-md`}>
            <Image
                source={require('../../assets/images/postimg1.png')}
                style={tw`h-[200px] w-[170px] rounded-md`}
            />
            <View style={tw`absolute bg- top-2 right-2 flex-row gap-2`}>
                <TouchableOpacity
                    style={tw`w-8 h-8 rounded-full bg-[#000000] bg-opacity-70 items-center justify-center`}
                    onPress={() => setIsLiked(!isLiked)}
                >
                    <Icon name={isLiked ? 'heart' : 'heart-o'} size={16} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={tw`w-8 h-8 rounded-full bg-[#000000] bg-opacity-70 items-center justify-center`}
                    onPress={() => setIsSaved(!isSaved)}
                >
                    <Icon name={isSaved ? 'bookmark' : 'bookmark-o'} size={16} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};


// --- Main Discovery Screen ---
const DiscoveryScreen = () => {
    const [activeTab, setActiveTab] = useState('All');

    const allItems: DiscoveryItem[] = [
        { id: '1', imageUrl: 'https://placehold.co/163x163/EFEFEF/3A3E41?text=1', category: 'Painting', aspectRatio: 1 },
        { id: '2', imageUrl: 'https://placehold.co/235x329/EFEFEF/3A3E41?text=2', category: 'Nail Art', aspectRatio: 235 / 329 },
        { id: '3', imageUrl: 'https://placehold.co/163x163/EFEFEF/3A3E41?text=3', category: 'Dancing', aspectRatio: 1 },
        { id: '4', imageUrl: 'https://placehold.co/234x163/EFEFEF/3A3E41?text=4', category: 'Music', aspectRatio: 234 / 163 },
        { id: '5', imageUrl: 'https://placehold.co/163x163/EFEFEF/3A3E41?text=5', category: 'Painting', aspectRatio: 1 },
        { id: '6', imageUrl: 'https://placehold.co/235x163/EFEFEF/3A3E41?text=6', category: 'Nail Art', aspectRatio: 235 / 163 },
    ];

    const filteredItems = activeTab === 'All' ? allItems : allItems.filter(item => item.category === activeTab);

    // Split items into two columns for the masonry layout
    const leftColumn = filteredItems.filter((_, index) => index % 2 === 0);
    const rightColumn = filteredItems.filter((_, index) => index % 2 !== 0);

    return (
        <View style={tw`flex-1 bg-[#0F0E13]`}>
            <Header searchStatus searchPlaceholder='Search jobs, companies' />
            <Text style={tw`text-white text-xl font-bold p-4`}>Discovery</Text>
            <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <ScrollView contentContainerStyle={tw`p-4`}>
                <View style={tw`flex-row gap-2`}>
                    <View style={tw`flex-1 gap-2`}>
                        {leftColumn.map(item => <DiscoveryCard key={item.id} item={item} />)}
                    </View>
                    <View style={tw`flex-1 gap-2`}>
                        {rightColumn.map(item => <DiscoveryCard key={item.id} item={item} />)}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default DiscoveryScreen;
