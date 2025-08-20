import { imageAssets } from "@/assets/images/image";
import tw from "@/lib/tailwind";
import { PostCardProps } from "@/lib/types/type";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ImageCarouselIndicator } from "./ImageCarouselIndicator";
import { PostFooter } from "./PostFooter";
import { PostHeader } from "./PostHeader";

export const PostCard: React.FC<PostCardProps> = ({ user, likes, comments, shares }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Determine if the text is long enough to need a "see more" button
    const isLongText = user.postText && user.postText.length > 100;

    // Toggle the expanded state
    const toggleText = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={tw`bg-[#3A3E41] my-2`}>
            <PostHeader user={user} isFollowing={user.isFollowing} />


            <TouchableOpacity onPress={() => router.push(`/drawer/screens/Post_Details`)}>

                {user.postText && (
                    <View style={tw`px-4 pb-3`}>
                        <Text style={tw`text-white`}>
                            {isExpanded || !isLongText ? user.postText : `${user.postText.substring(0, 100)}... `}
                            {isLongText && (
                                <TouchableOpacity onPress={toggleText}>
                                    <Text style={tw`text-blue-400 `}>
                                        {isExpanded ? 'see less' : 'see more'}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </Text>
                    </View>
                )}

                <View style={tw`relative`}>
                    <Image source={imageAssets.postimg} style={tw`w-full h-80`} resizeMode="cover" />
                    <ImageCarouselIndicator />
                </View>
            </TouchableOpacity>

            <PostFooter likes={likes} comments={comments} shares={shares} />
        </View>
    );
};
