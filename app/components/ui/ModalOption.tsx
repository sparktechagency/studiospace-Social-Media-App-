import tw from "@/lib/tailwind";
import { Text, TouchableOpacity, View } from "react-native";

const ModalOption: React.FC<{ icon: React.ReactNode; text: string; onPress: () => void }> = ({ icon, text, onPress }) => (
    <TouchableOpacity style={tw`flex-row items-center gap-4 py-3`} onPress={onPress}>
        <View style={tw`w-10 h-10 bg-white rounded-full items-center justify-center`}>
            {icon}
        </View>
        <Text style={tw`text-white text-lg font-bold `}>{text}</Text>
    </TouchableOpacity>
);

export default ModalOption;