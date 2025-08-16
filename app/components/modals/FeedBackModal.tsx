import { blockuser, hidepost, intersted, notintersted, report, savedPost } from '@/assets/icon/Icon';
import tw from '@/lib/tailwind';
import React from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import ModalOption from './ModalOption';
const FeedBackModal: React.FC<{ visible: boolean; onClose: () => void; onOptionPress: (option: string) => void; userName: string }> = ({ visible, onClose, onOptionPress, userName }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={tw`flex-1 justify-end bg-black bg-opacity-50`} onPress={onClose} activeOpacity={1}>
                {/* Prevent modal from closing when tapping inside it */}
                <TouchableOpacity activeOpacity={1} style={tw`bg-[#3A3E41] rounded-t-3xl`}>
                    {/* Modal Handle */}
                    <View style={tw`items-center py-3`}>
                        <View style={tw`w-16 h-1.5 bg-gray-500 rounded-full`} />
                    </View>

                    {/* Options List */}
                    <View style={tw`p-4`}>
                        <ModalOption icon={
                            <SvgXml xml={intersted} />
                        } text="Interested" onPress={() => onOptionPress('Interested')} />
                        <ModalOption icon={<SvgXml xml={notintersted} />} text="Not Interested" onPress={() => onOptionPress('Not Interested')} />
                        <ModalOption icon={<SvgXml xml={savedPost} />} text="Save Post" onPress={() => onOptionPress('Save Post')} />
                        <ModalOption icon={<SvgXml xml={report} />} text="Report Post" onPress={() => onOptionPress('Report Post')} />
                        <ModalOption icon={<SvgXml xml={hidepost} />} text="Hide Post" onPress={() => onOptionPress('Hide Post')} />
                        <ModalOption icon={<SvgXml xml={blockuser} />} text={`Block ${userName}'s profile`} onPress={() => onOptionPress('Block Profile')} />
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};


export default FeedBackModal