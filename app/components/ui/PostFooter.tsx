

// import { PostFooterProps } from "@/lib/types/type";
// import React, { useState } from "react";
// import { Text, TouchableOpacity, View } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import MaterialIcon from "react-native-vector-icons/MaterialIcons";
// import tw from "twrnc";
// import CommentsModal from "./CommentsModal"; // Adjust path if needed
// import SocialShareModal from "./SocialShareModal"; // Adjust path if needed


// interface Comment {
//     id: string;
//     name: string;
//     avatar: string;
//     text: string;
//     timestamp: string;
//     replies?: Comment[];
// }

// export const PostFooter: React.FC<PostFooterProps> = ({ likes, comments, shares }) => {
//     const [showReactions, setShowReactions] = useState(false);
//     const [reaction, setReaction] = useState<string | null>(null);
//     const [isBookmarked, setIsBookmarked] = useState(false);
//     const [isCommentsModalVisible, setCommentsModalVisible] = useState(false);
//     const [isShareModalVisible, setShareModalVisible] = useState(false);
//     const [commentsList, setCommentsList] = useState<Comment[]>([
//         {
//             id: '1',
//             name: 'John Doe',
//             avatar: '../../../assets/images/avater.png',
//             text: 'Great post!',
//             timestamp: '1 minute ago',
//         },
//         {
//             id: '2',
//             name: 'Mehedi',
//             avatar: 'https://placehold.co/45x45/EFEFEF/3A3E41?text=M',
//             text: 'Awesome!',
//             timestamp: '5 minutes ago',
//             replies: [
//                 {
//                     id: '2a',
//                     name: 'John Doe',
//                     avatar: '../../../assets/images/avater.png',
//                     text: 'Thanks!',
//                     timestamp: '1 minute ago',
//                 },
//             ]
//         }
//     ]);


//     const handleReaction = (selectedReaction: string | null) => {
//         setReaction(selectedReaction);
//         setShowReactions(false);
//     };
//     const handlePostComment = (commentText: string, parentId?: string) => {
//         const newComment: Comment = {
//             id: Math.random().toString(),
//             name: 'Your Name', // Replace with the actual logged-in user's name
//             avatar: 'https://placehold.co/40x40/EFEFEF/3A3E41?text=Me',
//             text: commentText,
//             timestamp: 'now',
//         };

//         if (!parentId) {
//             // Add as a new top-level comment
//             setCommentsList(prev => [...prev, newComment]);
//         } else {
//             // Find the parent comment and add the reply
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


//     return (
//         <View>
//             {/* Comments Modal */}
//             <CommentsModal
//                 isVisible={isCommentsModalVisible}
//                 onClose={() => setCommentsModalVisible(false)}
//                 comments={commentsList}
//                 onPostComment={handlePostComment}
//             />

//             {/* Social Share Modal */}
//             <SocialShareModal
//                 isVisible={isShareModalVisible}
//                 onClose={() => setShareModalVisible(false)}
//                 url="https://your-app-url.com/post/123"
//                 title="Check out this awesome post!"
//             />

//             {/* Emoji Reactions Pop-up */}
//             {showReactions && (
//                 <View style={tw`absolute -top-10 left-4 flex-row gap-2 bg-gray-700 p-2 rounded-full z-10`}>
//                     <TouchableOpacity onPress={() => handleReaction('❤️')}><Text style={tw`text-2xl`}>❤️</Text></TouchableOpacity>
//                     <TouchableOpacity onPress={() => handleReaction('😂')}><Text style={tw`text-2xl`}>😂</Text></TouchableOpacity>
//                     <TouchableOpacity onPress={() => handleReaction('😢')}><Text style={tw`text-2xl`}>😢</Text></TouchableOpacity>
//                     <TouchableOpacity onPress={() => handleReaction('😡')}><Text style={tw`text-2xl`}>😡</Text></TouchableOpacity>
//                 </View>
//             )}

//             <View style={tw`flex-row justify-between items-center p-4 border-t border-gray-700   w-full`}>
//                 <View style={tw`flex-row items-center gap-4`}>
//                     <TouchableOpacity
//                         style={tw`flex-row items-center gap-2 h-[30px]`}
//                         onPress={() => handleReaction(reaction ? null : '👍')}
//                         onLongPress={() => setShowReactions(true)}
//                     >
//                         {reaction ? (
//                             <Text style={tw`text-2xl`}>{reaction}</Text>
//                         ) : (
//                             <Icon name="heart-o" size={24} color="white" />
//                         )}
//                         <Text style={tw`text-white font-bold`}>{likes}</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={tw`flex-row items-center gap-2`} onPress={() => setCommentsModalVisible(true)}>
//                         <Icon name="comment-o" size={24} color="white" />
//                         <Text style={tw`text-white font-bold`}>{comments}</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={tw`flex-row items-center gap-2`} onPress={() => setShareModalVisible(true)}>
//                         <Icon name="share-square-o" size={24} color="white" />
//                         <Text style={tw`text-white font-bold`}>{shares}</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
//                     <MaterialIcon name={isBookmarked ? "bookmark" : "bookmark-border"} size={28} color="white" />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };



import { PostFooterProps } from "@/lib/types/type";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import tw from "twrnc";
import CommentsModal from "../modals/CommentsModal"; // Adjust path if needed
import SocialShareModal from "../modals/SocialShareModal"; // Adjust path if needed

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
    const [isShareModalVisible, setShareModalVisible] = useState(false);
    const [commentsList, setCommentsList] = useState<Comment[]>([
        {
            id: '1',
            name: 'John Doe',
            avatar: '../../../assets/images/avater.png',
            text: 'Great post!',
            timestamp: '1 minute ago',
        },
        {
            id: '2',
            name: 'Mehedi',
            avatar: '../../../assets/images/avater/avater4.png',
            text: 'Awesome!',
            timestamp: '5 minutes ago',
            replies: [
                {
                    id: '2a',
                    name: 'John Doe',
                    avatar: '../../../assets/images/avater.png',
                    text: 'Thanks!',
                    timestamp: '1 minute ago',
                },
            ]
        },
        {
            id: '3',
            name: 'John Doe',
            avatar: '../../../assets/images/avater.png',
            text: 'Great post!',
            timestamp: '1 minute ago',
        },
        {
            id: '4',
            name: 'Mehedi',
            avatar: '../../../assets/images/avater/avater4.png',
            text: 'Awesome!',
            timestamp: '5 minutes ago',
            replies: [
                {
                    id: '2a',
                    name: 'John Doe',
                    avatar: '../../../assets/images/avater.png',
                    text: 'Thanks!',
                    timestamp: '1 minute ago',
                },
            ]
        },
        {
            id: '5',
            name: 'John Doe',
            avatar: '../../../assets/images/avater.png',
            text: 'Great post!',
            timestamp: '1 minute ago',
        },
        {
            id: '6',
            name: 'Last Name',
            avatar: '../../../assets/images/avater.png',
            text: 'Great post!',
            timestamp: '1 minute ago',
        },
    ]);

    const handleReaction = (selectedReaction: string | null) => {
        setReaction(selectedReaction);
        setShowReactions(false);
    };

    // This function correctly handles adding both top-level comments and nested replies.
    const handlePostComment = (commentText: string, parentId?: string) => {
        const newComment: Comment = {
            id: Math.random().toString(),
            name: 'Your Name', // Replace with the actual logged-in user's name
            avatar: '../../../assets/images/avater.png',
            text: commentText,
            timestamp: 'now',
        };

        if (!parentId) {
            // Add as a new top-level comment
            setCommentsList(prev => [...prev, newComment]);
        } else {
            // Find the parent comment and add the reply recursively
            const addReply = (comments: Comment[]): Comment[] => {
                return comments.map(comment => {
                    if (comment.id === parentId) {
                        return {
                            ...comment,
                            replies: [...(comment.replies || []), newComment],
                        };
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

    return (
        <View>
            <CommentsModal
                isVisible={isCommentsModalVisible}
                onClose={() => setCommentsModalVisible(false)}
                comments={commentsList}
                onPostComment={handlePostComment}
            />
            <SocialShareModal
                isVisible={isShareModalVisible}
                onClose={() => setShareModalVisible(false)}
                url="https://your-app-url.com/post/123"
                title="Check out this awesome post!"
            />
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

                    <TouchableOpacity style={tw`flex-row items-center gap-2`} onPress={() => setCommentsModalVisible(true)}>
                        <Icon name="comment-o" size={24} color="white" />
                        <Text style={tw`text-white font-bold`}>{comments}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`flex-row items-center gap-2`} onPress={() => setShareModalVisible(true)}>
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
