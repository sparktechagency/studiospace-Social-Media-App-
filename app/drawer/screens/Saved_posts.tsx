import { Post } from '@/lib/types/type';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import Header from '../../../components/ui/Header';
import { PostCard } from '../../../components/ui/PostCard';

import Icon from 'react-native-vector-icons/FontAwesome';
import JobCard from '../../../components/ui/JobCard';
// --- Type Definitions ---
export interface Job {
    id: string;
    title: string;
    company: string;
    logo: string;
    location: string;
    type: "Full-Time" | "Part-Time" | "Contract" | "Internship";
    salary: string;
    posted: string;
    description: string;
    isOnline?: boolean;
    isRemote?: boolean;
}





// --- Main Saved Posts Screen ---
const SavedPostsScreen = () => {
    const [activeTab, setActiveTab] = useState('posts');

    // --- Mock Data ---
    const users = {
        messi: {
            name: 'Leo Messi',
            title: 'Product Designer @ Google',
            avatar: 'https://placehold.co/55x55/EFEFEF/3A3E41?text=LM',
            time: '8d',
            isFollowing: true,
            postText: 'This is a saved post about the latest design trends. It is important to keep up with what is new and exciting in the world of UI/UX.'
        },
        pele: {
            name: 'Pele',
            title: 'Shared this post',
            avatar: 'https://placehold.co/45x45/EFEFEF/3A3E41?text=P',
            time: '1d',
        }
    };

    const savedPosts: Post[] = [
        {
            id: 'saved_post_1',
            user: users.messi,
            image: `https://placehold.co/400x300/cccccc/3A3E41?text=Saved+Post+1`,
            likes: '3.1k',
            comments: '450',
            shares: '120'
        },
        {
            id: 'saved_post_2',
            user: users.pele,
            image: `https://placehold.co/400x300/cccccc/3A3E41?text=Saved+Post+2`,
            likes: '5.5k',
            comments: '800',
            shares: '300',
            isSharedPost: { sharer: users.pele }
        },
    ];

    const savedJobs: Job[] = [
        { id: 'saved_job_1', title: 'Senior Product Designer', company: 'Figma', location: 'San Francisco, CA', logo: '', type: 'Full-Time', salary: '$140k - $180k', posted: '2 days ago', description: '' },
        { id: 'saved_job_2', title: 'Frontend Developer', company: 'Google', location: 'New York, NY', logo: '', type: 'Full-Time', salary: '$120k - $160k', posted: '3 days ago', description: '' },
    ];

    const renderContent = () => {
        if (activeTab === 'posts') {
            return (
                <FlatList
                    data={savedPosts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <PostCard {...item} />}
                    contentContainerStyle={tw`p-2`}
                />
            );
        }
        if (activeTab === 'jobs') {
            return (
                <FlatList
                    data={savedJobs}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <JobCard job={item} />}
                    contentContainerStyle={tw`p-2`}
                />
            );
        }
        return null;
    };

    return (
        <View style={tw`flex-1 bg-[#0F0E13]`}>
            <Header searchStatus searchPlaceholder='Search saved posts' />
            <View style={tw``}>

                {/* --- Tabs --- */}
                <View style={tw`px-2 pt-2`}>
                    <Text>
                        <Text style={tw`text-white text-xl font-bold p-4`}>Saved</Text>
                    </Text>
                </View>
                <View style={tw`flex-row gap-4  p-2 `}>
                    <TouchableOpacity
                        style={tw`bg-[#3A3E41]  border rounded-lg ${activeTab === 'posts' ? 'border-white' : 'border-transparent'}`}
                        onPress={() => setActiveTab('posts')}
                    >
                        <View style={tw`flex-row items-center gap-2 py-2 px-4`}>
                            <Icon name="bookmark" size={20} color={activeTab === 'posts' ? 'white' : 'gray'} />
                            <Text style={tw`font-bold ${activeTab === 'posts' ? 'text-white' : 'text-gray-500'}`}>Saved posts</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={tw`bg-[#3A3E41]  border rounded-lg ${activeTab === 'jobs' ? 'border-white' : 'border-transparent'}`}
                        onPress={() => setActiveTab('jobs')}
                    >
                        <View style={tw`flex-row items-center gap-2 py-2 px-4`}>
                            <Icon name="briefcase" size={20} color={activeTab === 'jobs' ? 'white' : 'gray'} />
                            <Text style={tw`font-bold ${activeTab === 'jobs' ? 'text-white' : 'text-gray-500'}`}>Saved jobs</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {renderContent()}

            </View>
        </View>
    );
}

export default SavedPostsScreen;
