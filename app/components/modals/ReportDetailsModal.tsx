import tw from "@/lib/tailwind";
import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

const ReportDetailsModal: React.FC<{ visible: boolean; onClose: () => void; reportedReson: string; onSubmit: (comment: string) => void; }> = ({ visible, onClose, reportedReson, onSubmit }) => {
    const [comment, setComment] = useState("");

    const handleSubmit = () => {
        onSubmit(comment);
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={tw`flex-1 justify-end bg-black bg-opacity-50`} onPress={onClose} activeOpacity={1}>
                <TouchableOpacity activeOpacity={1} style={tw`bg-[#3A3E41] rounded-t-3xl`}>
                    <View style={tw`items-center py-3`}>
                        <View style={tw`w-16 h-1.5 bg-gray-500 rounded-full`} />
                    </View>
                    <View style={tw`p-4`}>
                        <Text style={tw`text-white text-xl font-bold text-center mb-2`}>Report</Text>
                        <Text style={tw`text-white text-base font-bold mb-1`}>You’re about to submit a report</Text>
                        <Text style={tw`text-gray-300 text-xs text-center mb-4`}>We only remove content that goes against our community standards</Text>

                        <Text style={tw`text-white text-base font-bold mt-4 mb-2`}>Report Details</Text>
                        <View style={tw`bg-[#0F0E13] border border-gray-500 rounded p-2`}>
                            <View style={tw`bg-[#A85E5E] self-start py-1 px-2 rounded`}>
                                <Text style={tw`text-[#7B1E1E] font-bold`}>{reportedReson}</Text>
                            </View>
                        </View>

                        <TextInput
                            style={tw`bg-[#0F0E13] border border-gray-500 rounded p-2 h-28 text-white mt-4`}
                            placeholder="Leave a comment about your report"
                            placeholderTextColor="#989898"
                            multiline={true}
                            textAlignVertical="top"
                            value={comment}
                            onChangeText={setComment}
                        />

                        <View style={tw`flex-row justify-end gap-4 mt-6`}>
                            <TouchableOpacity style={tw`py-2 px-4 rounded-lg border border-gray-600`} onPress={onClose}>
                                <Text style={tw`text-white font-bold`}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={tw`py-2 px-4 rounded-lg bg-[#4593F5] border border-white`} onPress={handleSubmit}>
                                <Text style={tw`text-white font-bold`}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

export default ReportDetailsModal