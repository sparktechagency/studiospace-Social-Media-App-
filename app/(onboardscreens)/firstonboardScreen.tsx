
import tw from "@/lib/tailwind";
import { router } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import twrnc from "twrnc";

// Define a type for our slide object for better code quality
interface OnboardingSlide {
    id: string;
    image: ReturnType<typeof require>;
    title: string;
    subtitle: string;
    imageStyle: object; // This will hold the specific style for each image
}

const onboardingSlides: OnboardingSlide[] = [
    {
        id: '1',
        image: require("../../assets/images/groupimg.png"),
        title: 'Grow Your Career Network',
        subtitle: 'Connect with professionals in your industry and beyond.',
        // Style for the first image
        imageStyle: tw`absolute top-[20%] left-[5%] rounded-r-[30px]`,
    },
    {
        id: '2',
        image: require("../../assets/images/group2.png"),
        title: 'Discover Job Opportunities',
        subtitle: 'Search and apply to jobs that match your skills',
        // A different style for the second image (e.g., smaller)
        imageStyle: tw`absolute top-[17%] left-0  `,
    },
    {
        id: '3',
        image: require("../../assets/images/group3.png"),
        title: 'Now It’s Your Turn',
        subtitle: 'Create your profile, connect with professionals, and open doors to new opportunities',
        // Another style for the third image (e.g., larger)
        imageStyle: tw`absolute top-[20%] left-0 right-[10%] rounded-l-[60px] rounded-r-[50px]`,
    },
];

// Get screen dimensions
const { width: screenWidth } = Dimensions.get("window");

// --- Individual Slide Component ---
// It now uses the 'imageStyle' from the item prop.
const OnboardingItem = ({ item }: { item: OnboardingSlide }) => {
    return (
        <View style={[styles.slideContainer, tw`items-center justify-center`]}>
            {/* The image now receives its style dynamically */}
            <Image
                source={item.image as any}
                style={item.imageStyle} // Apply the specific style here
                resizeMode="contain"
            />
        </View>
    );
};


// --- Main Onboarding Screen (No changes needed here) ---
const OnboardingScreen = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    }, []);

    const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

    return (
        <View style={twrnc`flex-1 bg-[#0F0E13] relative`}>
            <FlatList
                ref={flatListRef}
                data={onboardingSlides}
                renderItem={({ item }) => <OnboardingItem item={item} />}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                bounces={false}
            />

            <View style={twrnc`absolute bottom-[8%] left-0 right-0 items-center pb-8 px-8`}>
                <View style={twrnc`flex-row items-center gap-2 mb-8`}>
                    {onboardingSlides.map((_, index) => (
                        <View
                            key={index}
                            style={twrnc`
                                h-2 rounded-full
                                ${index === activeIndex ? 'w-3 h-3 bg-[#4593F5]' : 'w-2 bg-white opacity-50'}
                            `}
                        />
                    ))}
                </View>

                <View style={twrnc`items-center gap-4 w-full`}>
                    <Text style={twrnc`text-white text-center text-[28px] font-bold leading-[34px]`}>
                        {onboardingSlides[activeIndex].title}
                    </Text>
                    <Text style={twrnc`text-white text-center text-lg font-normal opacity-80 leading-6 px-4`}>
                        {onboardingSlides[activeIndex].subtitle}
                    </Text>
                    {
                        activeIndex === onboardingSlides.length - 1 && (
                            <TouchableOpacity onPress={() => router.push('/')} style={tw`bg-[#1778F2] h-[48px] flex items-center justify-center px-6 rounded-sm w-full text-white`}>
                                <Text style={twrnc`text-white text-center text-lg font-bold leading-6`}>
                                    Get Started

                                </Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    slideContainer: {
        width: screenWidth,
    },
});

export default OnboardingScreen;