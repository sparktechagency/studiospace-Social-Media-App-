import { blockuser, hidepost, intersted, notintersted, report, savedPost } from '@/assets/icon/Icon'
import tw from '@/lib/tailwind'
import { router } from 'expo-router'
import React from 'react'
import { Alert, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import ModalOption from '../components/ui/ModalOption'



const feedback_modal: React.FC<{ visible?: boolean; onClose?: () => void; userName: string }> = ({ visible, onClose, userName }) => {

    const onOptionPress = (option: string) => {
        Alert.alert('Option Pressed', option);
    };

    return (
        <View>
            <TouchableOpacity style={tw``} >
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
                        <ModalOption icon={<SvgXml xml={report} />} text="Report Post" onPress={() => {
                            router.back()
                            router.push('/modals/report_modal')
                        }} />
                        <ModalOption icon={<SvgXml xml={hidepost} />} text="Hide Post" onPress={() => onOptionPress('Hide Post')} />
                        <ModalOption icon={<SvgXml xml={blockuser} />} text={`Block ${userName}'s profile`} onPress={() => onOptionPress('Block Profile')} />
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    )
}

export default feedback_modal