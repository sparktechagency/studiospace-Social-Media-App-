import tw from '@/lib/tailwind';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// --- Type Definitions ---
interface Message {
    id: string;
    text: string;
    isSender: boolean; // True if the message is from the current user
    avatar: string;
}

// --- Reusable Components ---

const Header: React.FC<{ name: string; status: string; avatar: string }> = ({ name, status, avatar }) => (
    <View style={tw`bg-[#3A3E41] p-4 pt-12 flex-row items-center`}>
        <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Image source={require('../../assets/images/avater/avater3.png')} style={tw`w-12 h-12 rounded-full mx-4`} />
        <View style={tw`flex-1`}>
            <Text style={tw`text-white text-lg font-bold`}>{name}</Text>
            <Text style={tw`text-gray-300 text-xs`}>{status}</Text>
        </View>
        <TouchableOpacity>
            <Icon name="ellipsis-v" size={20} color="white" />
        </TouchableOpacity>
    </View>
);

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isSender = message.isSender;
    return (
        <View style={tw`flex-row items-end gap-2 my-2 ${isSender ? 'justify-end' : 'justify-start'}`}>
            {!isSender && <Image source={require('../../assets/images/avater/avater3.png')} style={tw`w-8 h-8 rounded-full`} />}
            <View style={tw`max-w-[70%] p-3 rounded-2xl ${isSender ? 'bg-blue-600 rounded-br-none' : 'bg-[#3A3E41] rounded-bl-none'}`}>
                <Text style={tw`text-white text-base`}>{message.text}</Text>
            </View>
            {isSender && <Image source={require('../../assets/images/avater/avater2.png')} style={tw`w-8 h-8 rounded-full`} />}
        </View>
    );
};

const MessageInput: React.FC<{ onSend: (text: string) => void }> = ({ onSend }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            onSend(text);
            setText('');
        }
    };

    return (
        <View style={tw`bg-[#3A3E41] p-2 pb-8 pt-4 flex-row items-center gap-2 border-t border-gray-700`}>
            {/* <TouchableOpacity><Icon name="paperclip" size={24} color="white" /></TouchableOpacity>
            <TouchableOpacity><Icon name="camera" size={24} color="white" /></TouchableOpacity>
            <TouchableOpacity><Icon name="microphone" size={24} color="white" /></TouchableOpacity> */}
            <View style={tw`flex-1 flex-row items-center bg-[#1A1C20] rounded-full border border-gray-600 px-2`}>
                <TextInput
                    style={tw`flex-1 text-white p-2`}
                    placeholder="Message"
                    placeholderTextColor="#989898"
                    value={text}
                    onChangeText={setText}
                />
                <TouchableOpacity>
                    <Icon name="smile-o" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleSend}>
                <Icon name="send" size={24} color="#1778F2" />
            </TouchableOpacity>
        </View>
    );
};


// --- Main Chat Details Screen ---
const ChatDetailsScreen = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hi! How are you?', isSender: false, avatar: 'https://placehold.co/34x34/EFEFEF/3A3E41?text=M' },
        { id: '2', text: 'I am fine. You?', isSender: true, avatar: 'https://placehold.co/34x34/EFEFEF/3A3E41?text=U' },
        { id: '3', text: 'I am also fine. OK so can you tell me about service that you wanted?', isSender: false, avatar: 'https://placehold.co/34x34/EFEFEF/3A3E41?text=M' },
        { id: '4', text: 'I want a fullstack developer', isSender: true, avatar: 'https://placehold.co/34x34/EFEFEF/3A3E41?text=U' },
    ]);
    const flatListRef = useRef<FlatList>(null);

    const handleSend = (text: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            text,
            isSender: true,
            avatar: '../../assets/images/avater/avater3.png',
        };
        setMessages(prev => [...prev, newMessage]);
    };

    return (
        <View style={tw`flex-1 bg-[#0F0E13]`}>
            <Header name="Mehedi" status="Active 2 hours ago" avatar="../../assets/images/avater/avater3.png" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={tw`flex-1`}
                keyboardVerticalOffset={90}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <MessageBubble message={item} />}
                    contentContainerStyle={tw`p-4`}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                    onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
                />
                <MessageInput onSend={handleSend} />
            </KeyboardAvoidingView>
        </View>
    );
};

export default ChatDetailsScreen;
