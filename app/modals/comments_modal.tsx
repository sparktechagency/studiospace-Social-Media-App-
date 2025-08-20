// import { imageAssets } from '@/assets/images/image'
// import CommentItem from '@/components/ui/CommentItem'
// import tw from '@/lib/tailwind'
// import React, { useState } from 'react'
// import { FlatList, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome'
// interface Comment {
//     id: string;
//     name: string;
//     avatar: string;
//     text: string;
//     timestamp: string;
//     replies?: Comment[];
// }
// const [commentsList, setCommentsList] = useState<Comment[]>([
//     {
//         id: '1',
//         name: 'John Doe',
//         avatar: '../../assets/images/avater.png',
//         text: 'Great post!',
//         timestamp: '1 minute ago',
//     },
//     {
//         id: '2',
//         name: 'Mehedi',
//         avatar: '../../assets/images/avater/avater4.png',
//         text: 'Awesome!',
//         timestamp: '5 minutes ago',
//         replies: [
//             {
//                 id: '2a',
//                 name: 'John Doe',
//                 avatar: '../../assets/images/avater.png',
//                 text: 'Thanks!',
//                 timestamp: '1 minute ago',
//             },
//         ]
//     },
//     {
//         id: '3',
//         name: 'John Doe',
//         avatar: '../../assets/images/avater.png',
//         text: 'Great post!',
//         timestamp: '1 minute ago',
//     },
//     {
//         id: '4',
//         name: 'Mehedi',
//         avatar: '../../assets/images/avater/avater4.png',
//         text: 'Awesome!',
//         timestamp: '5 minutes ago',
//         replies: [
//             {
//                 id: '2a',
//                 name: 'John Doe',
//                 avatar: '../../assets/images/avater.png',
//                 text: 'Thanks!',
//                 timestamp: '1 minute ago',
//             },
//         ]
//     },
//     {
//         id: '5',
//         name: 'John Doe',
//         avatar: '../../assets/images/avater.png',
//         text: 'Great post!',
//         timestamp: '1 minute ago',
//     },
//     {
//         id: '6',
//         name: 'Last Name',
//         avatar: '../../assets/images/avater.png',
//         text: 'Great post!',
//         timestamp: '1 minute ago',
//     },
// ]);
// const comments_modal = () => {
//     const [newComment, setNewComment] = useState("");
//     const [replyingTo, setReplyingTo] = useState<string | null>(null);
//     const handlePostComment = (commentText: string, parentId?: string) => {
//         const newComment: Comment = {
//             id: Math.random().toString(),
//             name: 'Your Name', // Replace with the actual logged-in user's name
//             avatar: '../../assets/images/avater.png',
//             text: commentText,
//             timestamp: 'now',
//         };

//         if (!parentId) {
//             // Add as a new top-level comment
//             setCommentsList(prev => [...prev, newComment]);
//         } else {
//             // Find the parent comment and add the reply recursively
//             const addReply = (comments: Comment[]): Comment[] => {
//                 return comments.map(comment => {
//                     if (comment.id === parentId) {
//                         return {
//                             ...comment,
//                             replies: [...(comment.replies || []), newComment],
//                         };
//                     }
//                     if (comment.replies) {
//                         return { ...comment, replies: addReply(comment.replies) };
//                     }
//                     return comment;
//                 });
//             };
//             setCommentsList(addReply(commentsList));
//         }
//     };
//     const handlePost = () => {
//         if (newComment.trim()) {
//             handlePostComment(newComment, replyingTo || undefined);
//             setNewComment("");
//             setReplyingTo(null);
//         }
//     };

//     const handleReply = (commentId: string) => {
//         setReplyingTo(commentId);
//     };

//     return (
//         <>
//             <KeyboardAvoidingView
//                 behavior={Platform.OS === "ios" ? "padding" : "height"}
//                 style={tw`flex-1`}
//                 keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
//             >

//                 <View style={tw``}>

//                     <View style={tw`bg-[#3A3E41] h-[90%] rounded-t-3xl`}>
//                         <View style={tw`p-4 flex-1`}>
//                             <View style={tw`flex-row justify-between items-center mb-4`}>
//                                 <Text style={tw`text-white text-lg font-bold`}>Comments</Text>

//                             </View>


//                             <FlatList
//                                 data={commentsList}
//                                 keyExtractor={(item) => item.id}
//                                 renderItem={({ item }) => <CommentItem comment={item} onReply={handleReply} />}
//                                 style={tw`flex-1`}
//                             />
//                         </View>

//                         {replyingTo && (
//                             <View style={tw`bg-gray-600 p-2 px-4`}>
//                                 <Text style={tw`text-white text-sm`}>
//                                     Replying...
//                                     <Text style={tw`font-bold text-red-400`} onPress={() => setReplyingTo(null)}> (Cancel)</Text>
//                                 </Text>
//                             </View>
//                         )}

//                         <View style={tw`flex-row items-center border-t border-gray-500 pt-3 bg-[#35393C] px-4 pb-2`}>
//                             <Image source={imageAssets.avater} style={tw`w-10 h-10 rounded-full`} />
//                             <TextInput
//                                 style={tw`flex-1 bg-[#1A1C20] text-white rounded-lg px-4 py-2 mx-3`}
//                                 placeholder={replyingTo ? "Add a reply..." : "Add a comment"}
//                                 placeholderTextColor="#989898"
//                                 value={newComment}
//                                 onChangeText={setNewComment}
//                             />
//                             <TouchableOpacity onPress={handlePost}>
//                                 <Icon name="paper-plane" size={24} color="white" />
//                             </TouchableOpacity>
//                         </View>
//                     </View>

//                 </View>

//             </KeyboardAvoidingView>
//         </>
//     )
// }

// export default comments_modal

import { imageAssets } from '@/assets/images/image';
import CommentItem from '@/components/ui/CommentItem';
import tw from '@/lib/tailwind';
import React, { useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// --- Type Definitions ---
interface Comment {
    id: string;
    name: string;
    avatar: string;
    text: string;
    timestamp: string;
    replies?: Comment[];
}

interface CommentItemProps {
    comment: Comment;
    onReply: (commentId: string) => void;
}

// --- Reusable Comment Item Component ---


// --- Main Comments Modal Screen ---
const comments_modal = () => {
    const [commentsList, setCommentsList] = useState<Comment[]>([
        // ... (your existing mock data)
        { id: '1', name: 'John Doe', avatar: 'https://placehold.co/40x40', text: 'Great post!', timestamp: '1 minute ago' },
        { id: '2', name: 'Mehedi', avatar: 'https://placehold.co/40x40', text: 'Awesome!', timestamp: '5 minutes ago', replies: [{ id: '2a', name: 'John Doe', avatar: 'https://placehold.co/40x40', text: 'Thanks!', timestamp: '1 minute ago' }] },
        { id: '3', name: 'Jane Smith', avatar: 'https://placehold.co/40x40', text: 'Love this!', timestamp: '10 minutes ago' },
        { id: '4', name: 'Alex Ray', avatar: 'https://placehold.co/40x40', text: 'Very insightful.', timestamp: '1 hour ago' },
        { id: '5', name: 'Emily White', avatar: 'https://placehold.co/40x40', text: 'Could not agree more.', timestamp: '2 hours ago' },
        { id: '6', name: 'Michael Brown', avatar: 'https://placehold.co/40x40', text: 'Perfectly said.', timestamp: '3 hours ago' },
        { id: '7', name: 'Last Name', avatar: 'https://placehold.co/40x40', text: 'This is the last comment for scrolling test.', timestamp: '4 hours ago' },
    ]);
    const [newComment, setNewComment] = useState("");
    const [replyingTo, setReplyingTo] = useState<string | null>(null);

    const handlePostComment = (commentText: string, parentId?: string) => {
        const newComment: Comment = {
            id: Math.random().toString(),
            name: 'Your Name',
            avatar: 'https://placehold.co/40x40',
            text: commentText,
            timestamp: 'now',
        };

        if (!parentId) {
            setCommentsList(prev => [...prev, newComment]);
        } else {
            const addReply = (comments: Comment[]): Comment[] => {
                return comments.map(comment => {
                    if (comment.id === parentId) {
                        return { ...comment, replies: [...(comment.replies || []), newComment] };
                    }
                    if (comment.replies) {
                        return { ...comment, replies: addReply(comment.replies) };
                    }
                    return comment;
                });
            };
            setCommentsList(addReply(commentsList));
        }
    };

    const handlePost = () => {
        if (newComment.trim()) {
            handlePostComment(newComment, replyingTo || undefined);
            setNewComment("");
            setReplyingTo(null);
        }
    };

    const handleReply = (commentId: string) => {
        setReplyingTo(commentId);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={tw`flex-1 justify-end`}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150} // Adjust offset as needed
        >
            <View style={tw`bg-[#3A3E41] h-[95%] rounded-t-3xl`}>
                <View style={tw`p-4 flex-1`}>
                    <View style={tw`flex-row justify-between items-center mb-4`}>
                        <Text style={tw`text-white text-lg font-bold`}>Comments</Text>
                        {/* Add a close button if needed, e.g., using expo-router */}
                        {/* <TouchableOpacity onPress={() => router.back()}>
                            <Icon name="close" size={20} color="white" />
                        </TouchableOpacity> */}
                    </View>

                    <FlatList
                        data={commentsList}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <CommentItem comment={item} onReply={handleReply} />}
                        style={tw`flex-1`}
                    />
                </View>

                {replyingTo && (
                    <View style={tw`bg-gray-600 p-2 px-4`}>
                        <Text style={tw`text-white text-sm`}>
                            Replying...
                            <Text style={tw`font-bold text-red-400`} onPress={() => setReplyingTo(null)}> (Cancel)</Text>
                        </Text>
                    </View>
                )}

                <View style={tw`flex-row items-center border-t border-gray-500 pt-3 bg-[#35393C] px-4 pb-8`}>
                    <Image source={imageAssets.avater} style={tw`w-10 h-10 rounded-full`} />
                    <TextInput
                        style={tw`flex-1 bg-[#1A1C20] text-white rounded-lg px-4 py-2 mx-3`}
                        placeholder={replyingTo ? "Add a reply..." : "Add a comment"}
                        placeholderTextColor="#989898"
                        value={newComment}
                        onChangeText={setNewComment}
                    />
                    <TouchableOpacity onPress={handlePost}>
                        <Icon name="paper-plane" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default comments_modal;
