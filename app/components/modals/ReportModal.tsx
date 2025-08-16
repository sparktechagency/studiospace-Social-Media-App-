import tw from "@/lib/tailwind";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ReportModal: React.FC<{ visible: boolean; onClose: () => void; onReportSubmit: (reason: string) => void }> = ({ visible, onClose, onReportSubmit }) => {
    const reportReasons = ["Harassment", "Inappropriate", "Spam", "Misinformation"];

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
                        <Text style={tw`text-white text-xl font-bold text-center mb-2 border-b border-gray-600`}>Report</Text>

                        <Text style={tw`text-white text-base font-bold mb-1`}>Why are you reporting this post?</Text>
                        <Text style={tw`text-gray-300 text-xs mb-4`}>If someone is in immediate danger, get help before reporting. Don’t wait.</Text>

                        {reportReasons.map(reason => (
                            <TouchableOpacity key={reason} style={tw`flex-row justify-between items-center py-3 border-b border-gray-600`} onPress={() => onReportSubmit(reason)}>
                                <Text style={tw`text-white text-base font-bold`}>{reason}</Text>
                                <Icon name="chevron-right" size={16} color="white" />
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};


export default ReportModal
