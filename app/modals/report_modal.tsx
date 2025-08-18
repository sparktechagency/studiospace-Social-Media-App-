import tw from '@/lib/tailwind';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Report_modal: React.FC<{ visible?: boolean; onClose?: () => void; onReportSubmit?: (reason: string) => void }> = ({ visible, onClose, onReportSubmit }) => {
    const reportReasons = ["Harassment", "Inappropriate", "Spam", "Misinformation"];
    return (
        <View>
            <TouchableOpacity style={tw``} onPress={onClose} activeOpacity={1}>
                <TouchableOpacity activeOpacity={1} style={tw`bg-[#3A3E41] rounded-t-3xl`}>
                    <View style={tw`items-center py-3`}>
                        <View style={tw`w-16 h-1.5 bg-gray-500 rounded-full`} />
                    </View>
                    <View style={tw`p-4`}>
                        <Text style={tw`text-white text-xl font-bold text-center mb-2 border-b border-gray-600`}>Report</Text>

                        <Text style={tw`text-white text-base font-bold mb-1`}>Why are you reporting this post?</Text>
                        <Text style={tw`text-gray-300 text-xs mb-4`}>If someone is in immediate danger, get help before reporting. Don’t wait.</Text>

                        {reportReasons.map(reason => (
                            <TouchableOpacity onPress={() => {
                                router.dismiss()
                                router.push(`/modals/report_details?reason=${reason}`)
                            }}


                                key={reason} style={tw`flex-row justify-between items-center py-3 border-b border-gray-600`} >
                                <Text style={tw`text-white text-base font-bold`}>{reason}</Text>
                                <Icon name="chevron-right" size={16} color="white" />
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    )
}

export default Report_modal