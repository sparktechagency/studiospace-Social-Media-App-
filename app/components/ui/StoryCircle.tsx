import tw from '@/lib/tailwind';
import { StoryCircleProps } from '@/lib/types/type';
import React from 'react';
import { Image, View } from 'react-native';

const StoryCircle: React.FC<StoryCircleProps> = ({ imageUrl, hasStory, isLive }) => (

    <View style={tw`items-center justify-center mx-2`}>
        <View
            style={tw`w-16 h-16 rounded-full items-center justify-center bg-gray-700
      ${hasStory ? 'border-2 border-blue-500' : ''}`}
        >
            <Image
                source={imageUrl as any}
                style={tw`w-14 h-14 rounded-full`}
            />
        </View>
        {isLive && (
            <View style={tw`absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800`} />
        )}
    </View>
);

export default StoryCircle;