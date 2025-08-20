

import { imageAssets } from '@/assets/images/image';
import tw from '@/lib/tailwind';
import React, { useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../../components/ui/Header';

// --- Type Definitions ---
interface User {
    name: string;
    title: string;
    avatar: string;
    time: string;
}

interface Comment {
    id: string;
    user: User;
    text: string;
    timestamp: string;
    replies?: Comment[];
}

interface CommentItemProps {
    comment: Comment;
    onReply: (commentId: string) => void;
}


// --- Reusable Components ---



const PostContent: React.FC<{ user: User }> = ({ user }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    return (
        <View style={tw`bg-[#3A3E41]`}>
            <View style={tw`p-4 flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center gap-3`}>
                    <Image source={imageAssets.avater} style={tw`w-14 h-14 rounded-full`} />
                    <View>
                        <Text style={tw`text-white text-base font-bold`}>{user.name}</Text>
                        <Text style={tw`text-gray-400 text-xs`}>{user.title}</Text>
                    </View>
                </View>
                <TouchableOpacity style={tw`bg-blue-500 py-1 px-4 rounded-full`}>
                    <Text style={tw`text-white font-bold`}>Connect</Text>
                </TouchableOpacity>
            </View>
            <Image source={imageAssets.postimg} style={tw`w-full h-80`} />
            <View style={tw`flex-row justify-between items-center p-4 `}>
                <View style={tw`flex-row items-center gap-4`}>
                    <TouchableOpacity style={tw`flex-row items-center gap-2`}><Icon name="heart-o" size={24} color="white" /><Text style={tw`text-white font-bold`}>2,500</Text></TouchableOpacity>
                    <TouchableOpacity style={tw`flex-row items-center gap-2`}><Icon name="comment-o" size={24} color="white" /><Text style={tw`text-white font-bold`}>1,200</Text></TouchableOpacity>
                    <TouchableOpacity style={tw`flex-row items-center gap-2`}><Icon name="share-square-o" size={24} color="white" /><Text style={tw`text-white font-bold`}>200</Text></TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
                    <MaterialIcon name={isBookmarked ? "bookmark" : "bookmark-border"} size={28} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const CommentItem: React.FC<CommentItemProps> = ({ comment, onReply }) => {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <View style={tw`py-3 px-1`}>
            <View style={tw`flex-row justify-between items-start`}>
                <View style={tw`flex-row items-start gap-3`}>
                    <Image source={imageAssets.avater} style={tw`w-10 h-10 rounded-full`} />
                    <View>
                        <Text style={tw`text-white font-bold`}>{comment.user.name}</Text>
                        <Text style={tw`text-gray-300`}>{comment.text}</Text>
                        <View style={tw`flex-row items-center gap-2 mt-1`}>
                            <TouchableOpacity onPress={() => onReply(comment.id)}>
                                <Text style={tw`text-gray-400 text-xs`}>Reply</Text>
                            </TouchableOpacity>
                            {comment.replies && <Text style={tw`text-gray-500 text-xs`}>· {comment.replies.length} replies</Text>}
                        </View>
                    </View>
                </View>
                <View style={tw`items-center gap-2`}>
                    <Text style={tw`text-gray-500 text-xs`}>{comment.timestamp}</Text>
                    <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
                        <Icon name={isLiked ? 'heart' : 'heart-o'} size={16} color={isLiked ? '#FF0000' : 'white'} />
                    </TouchableOpacity>
                </View>
            </View>
            {comment.replies && (
                <View style={tw`ml-10 pl-4 border-l-2 border-gray-600`}>
                    {comment.replies.map(reply => <CommentItem key={reply.id} comment={reply} onReply={onReply} />)}
                </View>
            )}
        </View>
    );
};

const CommentInput: React.FC<{ onSend: (text: string) => void; replyingTo: string | null; onCancelReply: () => void }> = ({ onSend, replyingTo, onCancelReply }) => {
    const [text, setText] = useState('');
    return (
        <View>
            {replyingTo && (
                <View style={tw`bg-gray-700 p-2 flex-row justify-between items-center`}>
                    <Text style={tw`text-white text-sm`}>Replying...</Text>
                    <TouchableOpacity onPress={onCancelReply}>
                        <Icon name="close" size={16} color="white" />
                    </TouchableOpacity>
                </View>
            )}
            <View style={tw`bg-[#3A3E41] p-4 pb-8 flex-row items-center gap-3 `}>
                <Image source={imageAssets.avater} style={tw`w-10 h-10 rounded-full`} />
                <View style={tw`flex-1 flex-row items-center bg-[#1A1C20] rounded-full border border-gray-500 px-3`}>
                    <TextInput
                        style={tw`flex-1 text-white py-2`}
                        placeholder="Add a comment"
                        placeholderTextColor="#989898"
                        value={text}
                        onChangeText={setText}
                    />

                </View>
                <TouchableOpacity onPress={() => { onSend(text); setText(''); }}>
                    <Icon name="send" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};


// --- Main Post Details Screen ---
const PostDetailsScreen = () => {
    const postUser: User = { name: 'Leo Messi', title: 'Product Designer @ Google', avatar: 'https://placehold.co/55x55', time: '8d' };
    const [comments, setComments] = useState<Comment[]>([
        { id: '1', user: { name: 'Cristiano Penaldo', avatar: 'https://placehold.co/45x45', title: '', time: '' }, text: 'Bravo', timestamp: '2d', replies: [{ id: '1a', user: { name: 'Maradona', avatar: 'https://placehold.co/45x45', title: '', time: '' }, text: 'Indeed!', timestamp: '1d' }] },
        { id: '2', user: { name: 'Another User', avatar: 'https://placehold.co/45x45', title: '', time: '' }, text: 'Great post!', timestamp: '3d' },
    ]);
    const [replyingTo, setReplyingTo] = useState<string | null>(null);

    const handleSendComment = (text: string) => {
        const newComment: Comment = {
            id: Date.now().toString(),
            user: { name: 'You', avatar: 'https://placehold.co/40x40', title: '', time: '' },
            text,
            timestamp: 'now',
        };

        if (replyingTo) {
            const addReply = (comments: Comment[]): Comment[] => {
                return comments.map(comment => {
                    if (comment.id === replyingTo) {
                        return { ...comment, replies: [...(comment.replies || []), newComment] };
                    }
                    if (comment.replies) {
                        return { ...comment, replies: addReply(comment.replies) };
                    }
                    return comment;
                });
            };
            setComments(addReply(comments));
            setReplyingTo(null);
        } else {
            setComments(prev => [...prev, newComment]);
        }
    };

    return (
        <View style={tw`flex-1 bg-[#0F0E13]`}>
            <Header searchStatus searchPlaceholder='Search jobs, companies' />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={tw`flex-1`}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <FlatList
                    ListHeaderComponent={<PostContent user={postUser} />}
                    data={comments}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CommentItem comment={item} onReply={setReplyingTo} />}
                    contentContainerStyle={tw`p-0.8`}
                    ItemSeparatorComponent={() => <View style={tw`h-px bg-gray-700`} />}
                />
                <CommentInput onSend={handleSendComment} replyingTo={replyingTo} onCancelReply={() => setReplyingTo(null)} />
            </KeyboardAvoidingView>
        </View>
    );
};

export default PostDetailsScreen;
