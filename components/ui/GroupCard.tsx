import { imageAssets } from "@/assets/images/image";
import tw from "@/lib/tailwind";
import { GroupCardProps } from "@/lib/types/type";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const GroupCard: React.FC<GroupCardProps> = ({ group }) => (
    <View style={tw`w-[48%] h-56 bg-[#3A3E41] rounded-xl overflow-hidden items-center p-4 justify-between`}>
        <View style={tw`items-center gap-1`}>
            <Image source={imageAssets.postimg} style={tw`w-14 h-14 rounded-full`} />
            <Text style={tw`text-white font-bold text-sm text-center`}>{group.name}</Text>
            <Text style={tw`text-gray-300 text-xs`}>{group.category}</Text>
        </View>
        <View style={tw`items-center gap-2`}>
            <Text style={tw`text-green-400 text-xs text-center`}>{group.mutuals} mutual connections</Text>
            <TouchableOpacity style={tw`bg-[#4593F5] py-1 px-8 rounded-full border border-white`}>
                <Text style={tw`text-white font-bold`}>Join</Text>
            </TouchableOpacity>
        </View>
    </View>
);