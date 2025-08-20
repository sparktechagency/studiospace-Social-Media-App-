
import { PostFooterProps } from "@/lib/types/type";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import tw from "twrnc";

// Define the Comment type to be used in state
interface Comment {
    id: string;
    name: string;
    avatar: string;
    text: string;
    timestamp: string;
    replies?: Comment[];
}

export const PostFooter: React.FC<PostFooterProps> = ({ likes, comments, shares }) => {
    const [showReactions, setShowReactions] = useState(false);
    const [reaction, setReaction] = useState<string | null>(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isCommentsModalVisible, setCommentsModalVisible] = useState(false);


    const handleReaction = (selectedReaction: string | null) => {
        setReaction(selectedReaction);
        setShowReactions(false);
    };

    // This function correctly handles adding both top-level comments and nested replies.


    return (
        <View>


            {showReactions && (
                <View style={tw`absolute -top-8 left-6 flex-row gap-2 bg-[#686868] p-2 px-4 rounded-tl-[15px] rounded-br-[15px] rounded-tr-[15px] h-[45px] z-10`}>
                    <TouchableOpacity onPress={() => handleReaction('❤️')}><Text style={tw`text-2xl`}>❤️</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handleReaction('😍')}><Text style={tw`text-2xl`}>😍</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handleReaction('😂')}><Text style={tw`text-2xl`}>😂</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handleReaction('😭')}><Text style={tw`text-2xl`}>😭</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handleReaction('😲')}><Text style={tw`text-2xl`}>😲</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => handleReaction('😡')}><Text style={tw`text-2xl`}>😡</Text></TouchableOpacity>
                </View>
            )}
            <View style={tw`flex-row w-full justify-between items-center p-4 border-t border-gray-700`}>
                <View style={tw`flex-row items-center gap-4`}>
                    <TouchableOpacity
                        style={tw`flex-row items-center gap-2 h-[30px]`}
                        onPress={() => handleReaction(reaction ? null : '❤️')}
                        onLongPress={() => setShowReactions(true)}
                    >
                        {reaction ? <Text style={tw`text-2xl`}>{reaction}</Text> : <Icon name="heart-o" size={24} color="white" />}
                        <Text style={tw`text-white font-bold`}>{likes}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`flex-row items-center gap-2`} onPress={() => router.push('/modals/comments_modal')}>
                        <Icon name="comment-o" size={24} color="white" />
                        <Text style={tw`text-white font-bold`}>{comments}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`flex-row items-center gap-2`} onPress={() => router.push('/modals/socialmedia_modal')}>
                        <Icon name="share-square-o" size={24} color="white" />
                        <Text style={tw`text-white font-bold`}>{shares}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
                    <MaterialIcon name={isBookmarked ? "bookmark" : "bookmark-border"} size={28} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};
