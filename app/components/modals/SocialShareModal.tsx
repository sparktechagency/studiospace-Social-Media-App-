import React from 'react';
import { Linking, Modal, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';

interface SocialShareModalProps {
    isVisible: boolean;
    onClose: () => void;
    url: string;
    title: string;
}

const SocialShareModal: React.FC<SocialShareModalProps> = ({ isVisible, onClose, url, title }) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    };

    const openShareLink = (shareUrl: string) => {
        Linking.openURL(shareUrl).catch(err => console.error("Couldn't load page", err));
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={tw`flex-1 justify-end bg-black bg-opacity-50`} onPress={onClose} activeOpacity={1}>
                <View style={tw`bg-[#2A2E31] p-4 rounded-t-2xl`}>
                    <Text style={tw`text-white text-xl font-bold text-center mb-4`}>Share Post</Text>
                    <TouchableOpacity style={tw`flex-row items-center py-3`} onPress={() => openShareLink(shareLinks.facebook)}>
                        <Icon name="facebook-square" size={30} color="#1877F2" />
                        <Text style={tw`text-white text-lg ml-4`}>Share on Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`flex-row items-center py-3`} onPress={() => openShareLink(shareLinks.twitter)}>
                        <Icon name="twitter-square" size={30} color="#1DA1F2" />
                        <Text style={tw`text-white text-lg ml-4`}>Share on Twitter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`flex-row items-center py-3`} onPress={() => openShareLink(shareLinks.linkedin)}>
                        <Icon name="linkedin-square" size={30} color="#0A66C2" />
                        <Text style={tw`text-white text-lg ml-4`}>Share on LinkedIn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`flex-row items-center py-3`} onPress={() => openShareLink(shareLinks.whatsapp)}>
                        <Icon name="whatsapp" size={30} color="#25D366" />
                        <Text style={tw`text-white text-lg ml-4`}>Share on WhatsApp</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default SocialShareModal;
