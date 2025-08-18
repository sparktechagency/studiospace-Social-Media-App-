import { menuicon, message, notification } from "@/assets/icon/Icon";
import { useSidebar } from "@/lib/hooks/SidebarContext";
import tw from "@/lib/tailwind";
import { router } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import Icon from "react-native-vector-icons/FontAwesome";

interface HeaderProps {
    searchStatus: boolean;
    title?: string;
    searchPlaceholder?: string;
}

const Header = ({ searchStatus, title, searchPlaceholder }: HeaderProps) => {
    const { toggleSidebar } = useSidebar();

    return (
        <View style={tw`bg-[#3A3E41] p-4 pt-12`}>
            <View style={tw`flex-row justify-between items-center`}>
                <TouchableOpacity onPress={toggleSidebar}>
                    <SvgXml xml={menuicon} />
                </TouchableOpacity>

                {searchStatus && (
                    <View style={tw`flex-1 flex-row items-center bg-[#1A1C20] rounded mx-4 px-3`}>
                        <Icon name="search" size={18} color="#989898" />
                        <TextInput
                            placeholder={searchPlaceholder || "Search jobs, companies"}
                            placeholderTextColor="#989898"
                            style={tw`text-white p-2 text-base w-full`}
                        />
                    </View>
                )}

                {title && (
                    <Text style={tw`text-white text-xl font-bold text-center`}>
                        {title}
                    </Text>
                )}

                <View style={tw`flex-row items-center gap-4`}>
                    <TouchableOpacity onPress={() => router.push("/(screens)/notification")} style={tw`relative`}>
                        <SvgXml xml={notification} />
                        <View style={tw`absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full`} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push("/chat_list")} style={tw`relative`}>
                        <SvgXml xml={message} />
                        <View style={tw`absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full`} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Header;