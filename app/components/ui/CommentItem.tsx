import tw from "@/lib/tailwind";
import { CommentItemProps } from "@/lib/types/type";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";


const CommentItem: React.FC<CommentItemProps> = ({ comment, onReply }) => {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <View style={tw`w-full`}>
            <View style={tw`flex-row justify-between items-start py-3`}>
                <View style={tw`flex-row items-start gap-4`}>
                    <Image source={require('../../../assets/images/avater/avater4.png')} style={tw`w-11 h-11 rounded-full`} />
                    <View style={tw`flex-col gap-1`}>
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


export default CommentItem;