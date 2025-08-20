
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from 'react-native-svg';
import tw from "twrnc";

// Import all your SVG icons
import { HomeActive, HomeInactive, JobsActive, JobsInactive, NetworkActive, Networkinactive, PostActive, Postinactive, ProfileActive, ProfileInactive } from "@/assets/icon/Icon";


const icons = {
    Home: { active: HomeActive, inactive: HomeInactive },
    Network: { active: NetworkActive, inactive: Networkinactive },
    Post: { active: PostActive, inactive: Postinactive },
    Jobs: { active: JobsActive, inactive: JobsInactive },
    Profile: { active: ProfileActive, inactive: ProfileInactive },
};

// Define your tabs with proper typing
const tabs = [
    { name: "/drawer/home", label: "Home", icon: "Home" },
    { name: "/drawer/home/network", label: "Network", icon: "Network" },
    { name: "/drawer/home/post", label: "Post", icon: "Post" },
    { name: "/drawer/home/jobs", label: "Jobs", icon: "Jobs" },
    { name: "/drawer/home/profile", label: "Profile", icon: "Profile" },
] as const;

export default function CustomTabBar() {
    const router = useRouter();
    const pathname = usePathname();



    return (
        <View
            style={tw`flex-row bg-[#3A3E41] border-t border-t-gray-700 py-3 justify-around items-center`}
        >
            {tabs.map((tab) => {
                const isActive = pathname === tab.name;
                const iconXml = isActive ? icons[tab.icon].active : icons[tab.icon].inactive;

                return (
                    <>
                        {/* {
                            isActive &&
                            <View className="absolute top-0 left-0 right-0">
                                <SvgXml xml={activeTopBar} />
                            </View>
                        } */}
                        <TouchableOpacity
                            key={tab.name}
                            onPress={() => router.push(tab.name)}
                            style={tw`items-center justify-center flex-1 py-2 ${isActive ? 'border-t-4 rounded-sm mx-2 border-white' : ''}`}
                        >


                            <SvgXml xml={iconXml} width="24" height="24" />
                            <Text
                                style={tw`text-xs mt-1 ${isActive ? 'text-white text-[12px] font-bold' : 'text-gray-400'
                                    }`}
                            >
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    </>
                );
            })}
        </View>
    );
}