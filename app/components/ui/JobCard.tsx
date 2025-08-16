import tw from "@/lib/tailwind";
import { Job } from "@/lib/types/type";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
    const [isSaved, setIsSaved] = useState(false);
    return (
        <View style={tw`bg-[#3A3E41] rounded-xl p-4 mb-4`}>
            <View style={tw`flex-row justify-between items-start`}>
                <View style={tw`flex-row items-start gap-4`}>
                    <Image source={require("../../../assets/images/avater/avater3.png")} style={tw`w-12 h-12 rounded-lg`} />
                    <View style={tw`w-60`}>
                        <Text style={tw`text-white text-base font-bold`}>{job.title}</Text>
                        <Text style={tw`text-gray-400 text-sm`}>{job.company}</Text>
                        <View style={tw`flex-row items-center gap-2 mt-1`}>
                            <Icon name="map-marker" size={14} color="#989898" />
                            <Text style={tw`text-gray-400 text-xs`}>{job.location}</Text>
                            <Text style={tw`text-gray-400 text-xs`}>· {job.type}</Text>
                            {job.isRemote && <Text style={tw`text-blue-400 font-bold text-xs`}>· Remote</Text>}
                        </View>
                        <Text style={tw`text-green-400 font-bold text-sm mt-1`}>{job.salary}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => setIsSaved(!isSaved)}>
                    <MaterialIcon name={isSaved ? "bookmark" : "bookmark-border"} size={24} color="white" />
                </TouchableOpacity>
            </View>
            <Text style={tw`text-gray-400 text-xs mt-3`}>{job.posted}</Text>
            <Text style={tw`text-gray-300 text-sm mt-2`}>{job.description}</Text>
            <View style={tw`flex-row items-center gap-3 mt-4`}>
                <TouchableOpacity onPress={() => router.push(`/(screens)/JobApply`)} style={tw`bg-[#4593F5] py-2 px-4 rounded-full border border-white`}>
                    <Text style={tw`text-white font-bold text-xs`}>Apply Now</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push(`/(screens)/JobDetails`)} style={tw`py-2 px-4 rounded-full border border-gray-500`}>
                    <Text style={tw`text-white font-bold text-xs`}>View Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default JobCard;
