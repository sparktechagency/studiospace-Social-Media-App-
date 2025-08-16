

import { Group, Post } from '@/lib/types/type';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, StatusBar, Text, View } from 'react-native';
import tw from 'twrnc';
import { GroupCard } from '../components/ui/GroupCard';
import HomeHeader from '../components/ui/HomeHeader';
import { PostCard } from '../components/ui/PostCard';
import Stories from '../components/ui/Stories';


// Define a union type for items in our feed
type FeedItem = Post | { type: 'suggested_groups'; id: string; groups: Group[] };


// --- Mock Data ---
const users = {
    messi: {
        name: 'Leo Messi',
        title: 'Product Designer @ Google',
        avatar: 'https://placehold.co/55x55/EFEFEF/3A3E41?text=LM',
        time: '8d',
        isFollowing: true,
        postText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur adipiscing elit, sed do eiusmod tempor incididunt'
    },
    pele: {
        name: 'Pele',
        title: 'Shared this post',
        avatar: 'https://placehold.co/45x45/EFEFEF/3A3E41?text=P',
        time: '1d',
    }
};

const groups: Group[] = [
    { name: 'Art Lovers', category: 'Painting', image: 'https://placehold.co/54x54/EFEFEF/3A3E41?text=A', mutuals: 15 },
    { name: 'Design Geeks', category: 'UI/UX', image: 'https://placehold.co/54x54/EFEFEF/3A3E41?text=D', mutuals: 8 },
];

// FIX: Added Math.random() to the post ID to ensure keys are always unique.
const generatePosts = (count: number): Post[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: `post_${Date.now()}_${i}_${Math.random()}`,
        user: users.messi,
        image: `https://placehold.co/400x300/cccccc/3A3E41?text=Post+${i + 1}`,
        likes: `${(Math.random() * 5).toFixed(1)}k`,
        comments: `${(Math.random() * 2).toFixed(1)}k`,
        shares: `${Math.floor(Math.random() * 500)}`,
        isSharedPost: Math.random() > 0.7 ? { sharer: users.pele } : undefined,
    }));
};

// --- Initial Feed Data ---
const initialPosts = generatePosts(2);
const suggestedGroupsItem: FeedItem = { type: 'suggested_groups', id: 'suggested_groups_1', groups: groups };
const morePosts = generatePosts(3);
const initialFeed: FeedItem[] = [...initialPosts, suggestedGroupsItem, ...morePosts];


const Home: React.FC = () => {
    const [feedItems, setFeedItems] = useState<FeedItem[]>(initialFeed);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchMorePosts = () => {
        if (isLoading) return;
        setIsLoading(true);
        setTimeout(() => {
            const newPosts = generatePosts(5);
            setFeedItems(prevItems => [...prevItems, ...newPosts]);
            setIsLoading(false);
        }, 1500);
    };

    const onRefresh = useCallback(() => {
        setIsRefreshing(true);
        setTimeout(() => {
            // FIX: Explicitly typed the refreshed feed array to resolve the TypeScript error.
            const refreshedSuggestedGroups: FeedItem = { type: 'suggested_groups', id: `suggested_groups_${Date.now()}`, groups: groups };
            const refreshedFeed: FeedItem[] = [
                ...generatePosts(2),
                refreshedSuggestedGroups,
                ...generatePosts(3)
            ];
            setFeedItems(refreshedFeed);
            setIsRefreshing(false);
        }, 2000);
    }, []);

    const renderFeedItem = ({ item }: { item: FeedItem }) => {
        // --- Render Suggested Groups Card ---
        if ('type' in item && item.type === 'suggested_groups') {
            return (
                <View style={tw`p-4 gap-3`}>
                    <Text style={tw`text-white text-xl font-bold`}>Suggested Groups</Text>
                    <View style={tw`flex-row justify-between`}>
                        {item.groups.map((group, index) => (
                            <GroupCard key={index} group={group} />
                        ))}
                    </View>
                </View>
            );
        }

        // --- Render Post Card ---
        const post = item as Post;
        if (post.isSharedPost) {
            return (
                <View style={tw`bg-[#3A3E41] my-2`}>

                    <View style={tw`p-4 flex-row items-center gap-3 border-b border-gray-700`}>
                        <Image source={require('../../assets/images/avater/avater3.png')} style={tw`w-12 h-12 rounded-full`} />
                        <View>
                            <Text style={tw`text-white font-bold`}>{post.isSharedPost.sharer.name}</Text>
                            <Text style={tw`text-gray-400`}>{post.isSharedPost.sharer.title}</Text>
                        </View>
                    </View>

                    <PostCard
                        user={post.user}
                        image={post.image}
                        likes={post.likes}
                        comments={post.comments}
                        shares={post.shares}
                    />
                </View>
            );
        }

        return (
            <PostCard
                user={post.user}
                image={post.image}
                likes={post.likes}
                comments={post.comments}
                shares={post.shares}
            />
        );
    };

    const ListFooter = () => {
        if (!isLoading) return null;
        return <ActivityIndicator size="large" color="#FFFFFF" style={tw`my-4`} />;
    };

    return (
        <View style={tw`flex-1 bg-[#0F0E13]`}>
            <StatusBar barStyle="light-content" />

            <HomeHeader />
            <Stories />

            <FlatList
                data={feedItems}
                renderItem={renderFeedItem}
                keyExtractor={(item) => item.id}
                ListFooterComponent={ListFooter}
                onEndReached={fetchMorePosts}
                onEndReachedThreshold={0.5}
                contentContainerStyle={tw`p-1`}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        tintColor="#FFFFFF"
                        colors={['#FFFFFF']}
                    />
                }
            />
        </View>
    );
};

export default Home;
