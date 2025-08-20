import tw from '@/lib/tailwind'
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'

// It's a good practice to name components with PascalCase
const ReportDetails = () => {
    // 1. Get the URL parameters using the hook
    const { reason } = useLocalSearchParams<{ reason: string }>();
    const [comment, setComment] = React.useState('');

    const handleSubmit = () => {
        // Here you would typically send the report to your backend
        console.log('Submitting report...');
        console.log('Reason:', reason);
        console.log('Comment:', comment);
        // After submitting, you can dismiss the modal or navigate away
        router.push('/drawer/home');
    };

    // Using <Pressable> for the background overlay is better for accessibility
    // and avoids nested TouchableOpacity issues.
    return (
        <Pressable onPress={() => router.dismiss()} style={tw``}>
            <Pressable style={tw`bg-[#3A3E41] rounded-t-3xl`}>
                <View style={tw`items-center py-3`}>
                    <View style={tw`w-16 h-1.5 bg-gray-500 rounded-full`} />
                </View>

                <View style={tw`p-4 pb-8`}>
                    <Text style={tw`text-white text-xl font-bold text-center mb-2`}>Report</Text>
                    <Text style={tw`text-white text-base font-bold mb-1`}>You’re about to submit a report</Text>
                    <Text style={tw`text-gray-300 text-xs text-center mb-4`}>We only remove content that goes against our community standards</Text>

                    <Text style={tw`text-white text-base font-bold mt-4 mb-2`}>Report Details</Text>
                    <View style={tw`bg-[#0F0E13] border border-gray-500 rounded p-2`}>
                        <View style={tw`bg-[#A85E5E] self-start py-1 px-2 rounded`}>
                            {/* 2. Display the reason from the hook */}
                            <Text style={tw`text-[#7B1E1E] font-bold`}>{reason}</Text>
                        </View>
                    </View>

                    <TextInput
                        style={tw`bg-[#0F0E13] border border-gray-500 rounded p-2 h-28 text-white mt-4`}
                        placeholder="Leave a comment about your report"
                        placeholderTextColor="#989898"
                        multiline
                        textAlignVertical="top"
                        value={comment}
                        onChangeText={setComment}
                    />

                    <View style={tw`flex-row justify-end gap-4 mt-6`}>
                        <TouchableOpacity style={tw`py-2 px-4 rounded-lg border border-gray-600`} onPress={() => router.dismiss()}>
                            <Text style={tw`text-white font-bold`}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={tw`py-2 px-4 rounded-lg bg-[#4593F5] border border-white`} onPress={handleSubmit}>
                            <Text style={tw`text-white font-bold`}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>
        </Pressable>
    )
}

export default ReportDetails;