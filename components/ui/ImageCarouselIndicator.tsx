import tw from "@/lib/tailwind";
import { ImageCarouselProps } from "@/lib/types/type";
import { View } from "react-native";

export const ImageCarouselIndicator: React.FC<ImageCarouselProps> = ({ activeIndex = 0, count = 4 }) => (
    <View style={tw`flex-row gap-1.5 absolute bottom-4 self-center`}>
        {Array.from({ length: count }).map((_, i) => (
            <View
                key={i}
                style={tw`w-1.5 h-1.5 rounded-full ${i === activeIndex ? 'bg-blue-500' : 'bg-gray-500'}`}
            />
        ))}
    </View>
);