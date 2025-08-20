

// import { imageAssets } from '@/assets/images/image';
// import React, { useState } from 'react';
// import { FlatList, Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import tw from 'twrnc';

// // --- Type Definitions ---

// interface Comment {
//     id: string;
//     name: string;
//     avatar: string;
//     text: string;
//     timestamp: string;
//     replies?: Comment[];
// }

// interface CommentsModalProps {
//     isVisible: boolean;
//     onClose: () => void;
//     comments: Comment[];
//     onPostComment: (commentText: string, parentId?: string) => void;
// }

// interface CommentItemProps {
//     comment: Comment;
//     onReply: (commentId: string) => void;
// }

// // --- Reusable Comment Item Component ---

// const CommentItem: React.FC<CommentItemProps> = ({ comment, onReply }) => {
//     const [isLiked, setIsLiked] = useState(false);

//     return (
//         <View style={tw`w-full`}>
//             <View style={tw`flex-row justify-between items-start py-3`}>
//                 <View style={tw`flex-row items-start gap-4`}>
//                     <Image source={imageAssets.avater} style={tw`w-11 h-11 rounded-full`} />
//                     <View style={tw`flex-col gap-1`}>
//                         <Text style={tw`text-white font-bold text-base`}>{comment.name}</Text>
//                         <Text style={tw`text-white text-sm`}>{comment.text}</Text>
//                         <TouchableOpacity onPress={() => onReply(comment.id)}>
//                             <Text style={tw`text-gray-400 font-medium text-sm`}>Reply</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//                 <View style={tw`items-center gap-2`}>
//                     <Text style={tw`text-gray-400 text-xs`}>{comment.timestamp}</Text>
//                     <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
//                         <Icon name={isLiked ? 'heart' : 'heart-o'} size={20} color={isLiked ? '#FF0000' : 'white'} />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//             {/* Render replies recursively */}
//             {comment.replies && (
//                 <View style={tw`ml-10 pl-4 border-l-2 border-gray-600`}>
//                     {comment.replies.map(reply => <CommentItem key={reply.id} comment={reply} onReply={onReply} />)}
//                 </View>
//             )}
//         </View>
//     );
// };


// // --- Main Comments Modal Component ---

// const CommentsModal: React.FC<CommentsModalProps> = ({ isVisible, onClose, comments, onPostComment }) => {
//     const [newComment, setNewComment] = useState("");
//     const [replyingTo, setReplyingTo] = useState<string | null>(null); // State to track the parent comment ID

//     const handlePost = () => {
//         if (newComment.trim()) {
//             // Pass the parent ID if it exists
//             onPostComment(newComment, replyingTo || undefined);
//             setNewComment("");
//             setReplyingTo(null); // Reset reply state after posting
//         }
//     };

//     // This function is called from the CommentItem to set the reply state
//     const handleReply = (commentId: string) => {
//         setReplyingTo(commentId);
//     };

//     return (
//         <Modal
//             animationType="slide"
//             transparent={true}
//             visible={isVisible}
//             onRequestClose={onClose}
//         >
//             <TouchableOpacity style={tw`flex-1 justify-end overflow-y-scroll bg-black bg-opacity-50`} activeOpacity={1}>
//                 <View style={tw`bg-[#3A3E41] h-[90%] p-4 rounded-t-3xl`}>
//                     <View style={tw`flex-row justify-between items-center`}>
//                         <Text style={tw`text-white text-lg font-bold text-center mb-4`}>Comments</Text>
//                         <TouchableOpacity onPress={onClose}>
//                             <Icon name="close" size={20} color="white" />
//                         </TouchableOpacity>
//                     </View>

//                     <FlatList
//                         data={comments}
//                         scrollEnabled={true}
//                         keyExtractor={(item) => item.id}
//                         renderItem={({ item }) => <CommentItem comment={item} onReply={handleReply} />}
//                         style={tw``}
//                     />

//                     {/* UI indicator for when the user is replying */}
//                     {replyingTo && (
//                         <View style={tw`bg-gray-600 p-2 -mx-4 px-4`}>
//                             <Text style={tw`text-white text-sm`}>
//                                 Replying...
//                                 <Text style={tw`font-bold text-red-400`} onPress={() => setReplyingTo(null)}> (Cancel)</Text>
//                             </Text>
//                         </View>
//                     )}

//                     <View style={tw`flex-row items-center mt-4 border-t border-gray-500 pt-3 bg-[#35393C] -mx-4 px-4 pb-2`}>
//                         <Image source={imageAssets.postimg} style={tw`w-10 h-10 rounded-full`} />
//                         <TextInput
//                             style={tw`flex-1 bg-[#1A1C20] text-white rounded-lg px-4 py-2 mx-3`}
//                             placeholder={replyingTo ? "Add a reply..." : "Add a comment"}
//                             placeholderTextColor="#989898"
//                             value={newComment}
//                             onChangeText={setNewComment}
//                         />
//                         <TouchableOpacity onPress={handlePost}>
//                             <Icon name="paper-plane" size={24} color="white" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </TouchableOpacity>
//         </Modal>
//     );
// };

// export default CommentsModal;

import { imageAssets } from '@/assets/images/image';
import React, { useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';

// --- Type Definitions ---

interface Comment {
    id: string;
    name: string;
    avatar: string;
    text: string;
    timestamp: string;
    replies?: Comment[];
}

interface CommentsModalProps {
    isVisible: boolean;
    onClose: () => void;
    comments: Comment[];
    onPostComment: (commentText: string, parentId?: string) => void;
}

interface CommentItemProps {
    comment: Comment;
    onReply: (commentId: string) => void;
}

// --- Reusable Comment Item Component ---

const CommentItem: React.FC<CommentItemProps> = ({ comment, onReply }) => {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <View style={tw`w-full`}>
            <View style={tw`flex-row justify-between items-start py-3`}>
                <View style={tw`flex-row items-start gap-4`}>
                    <Image source={imageAssets.avater} style={tw`w-11 h-11 rounded-full`} />
                    <View style={tw`flex-col gap-1 flex-1`}>
                        <Text style={tw`text-white font-bold text-base`}>{comment.name}</Text>
                        <Text style={tw`text-white text-sm`}>{comment.text}</Text>
                        <TouchableOpacity onPress={() => onReply(comment.id)}>
                            <Text style={tw`text-gray-400 font-medium text-sm`}>Reply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={tw`items-center gap-2`}>
                    <Text style={tw`text-gray-400 text-xs`}>{comment.timestamp}</Text>
                    <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
                        <Icon name={isLiked ? 'heart' : 'heart-o'} size={20} color={isLiked ? '#FF0000' : 'white'} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Render replies recursively */}
            {comment.replies && (
                <View style={tw`ml-10 pl-4 border-l-2 border-gray-600`}>
                    {comment.replies.map(reply => <CommentItem key={reply.id} comment={reply} onReply={onReply} />)}
                </View>
            )}
        </View>
    );
};


// --- Main Comments Modal Component ---

const CommentsModal: React.FC<CommentsModalProps> = ({ isVisible, onClose, comments, onPostComment }) => {
    const [newComment, setNewComment] = useState("");
    const [replyingTo, setReplyingTo] = useState<string | null>(null);

    const handlePost = () => {
        if (newComment.trim()) {
            onPostComment(newComment, replyingTo || undefined);
            setNewComment("");
            setReplyingTo(null);
        }
    };

    const handleReply = (commentId: string) => {
        setReplyingTo(commentId);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={tw`flex-1`}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={tw`flex-1 justify-end bg-black bg-opacity-50`}>
                        <TouchableWithoutFeedback>
                            <View style={tw`bg-[#3A3E41] h-[90%] rounded-t-3xl`}>
                                <View style={tw`p-4 flex-1`}>
                                    <View style={tw`flex-row justify-between items-center mb-4`}>
                                        <Text style={tw`text-white text-lg font-bold`}>Comments</Text>
                                        <TouchableOpacity onPress={onClose}>
                                            <Icon name="close" size={20} color="white" />
                                        </TouchableOpacity>
                                    </View>


                                    <FlatList
                                        data={comments}
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

                                <View style={tw`flex-row items-center border-t border-gray-500 pt-3 bg-[#35393C] px-4 pb-2`}>
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
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default CommentsModal;
