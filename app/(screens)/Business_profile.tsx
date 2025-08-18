


import { deleteIcon, editicon, editImageicon, verifiedbadge } from '@/assets/icon/Icon';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';

// --- Type Definitions ---
interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    posted: string;
    description: string;
    status: 'Approved' | 'Pending' | 'Rejected';
}

interface SelectedFile {
    uri: string;
    name: string;
}

// --- Reusable Components ---

const InfoCard: React.FC<{ title: string; children: React.ReactNode; isPrivate?: boolean }> = ({ title, children, isPrivate }) => (
    <View style={tw`bg-[#3A3E41] p-4 rounded-lg mb-4`}>
        <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text style={tw`text-white text-xl font-bold`}>{title}</Text>
            {isPrivate && (
                <View style={tw`bg-[#4593F5] py-1 px-2 rounded-md flex-row items-center gap-1`}>
                    <Icon name="lock" size={12} color="white" />
                    <Text style={tw`text-white text-xs font-semibold`}>Private</Text>
                </View>
            )}
        </View>
        {children}
    </View>
);

const StatItem: React.FC<{ icon: string; value: string; label: string }> = ({ icon, value, label }) => (
    <View style={tw`items-center`}>
        <View style={tw`flex-row items-center gap-2`}>
            <Icon name={icon} size={20} color="#1778F2" />
            <Text style={tw`text-white text-lg font-semibold`}>{value}</Text>
        </View>
        <Text style={tw`text-white text-sm font-bold text-center`}>{label}</Text>
    </View>
);

const ExperienceItem: React.FC<{ title: string; company: string; duration: string; location: string; description: string; logo: string }> = ({ title, company, duration, location, description, logo }) => (
    <View style={tw`flex-row gap-4 mb-4`}>
        <Image source={require('../../assets/images/avater/avater3.png')} style={tw`w-10 h-10 rounded-lg mt-1`} />
        <View style={tw`flex-1`}>
            <Text style={tw`text-white font-bold text-base`}>{title}</Text>
            <Text style={tw`text-gray-400 text-sm`}>{company}</Text>
            <Text style={tw`text-gray-400 text-xs`}>{duration} · {location}</Text>
            <Text style={tw`text-gray-300 text-sm mt-2`}>{description}</Text>
        </View>
    </View>
);

const JobPostingCard: React.FC<{ job: Job; onDelete: (id: string) => void }> = ({ job, onDelete }) => {
    const statusStyles = {
        Approved: 'bg-green-500 text-green-900',
        Pending: 'bg-yellow-500 text-yellow-900',
        Rejected: 'bg-red-500 text-red-900',
    };
    return (
        <View style={tw`bg-[#3A3E41] p-4 rounded-lg mb-3`}>
            <View style={tw`flex-row justify-between`}>
                <Text style={tw`text-white font-bold text-base`}>{job.title}</Text>
                <TouchableOpacity onPress={() => onDelete(job.id)}>
                    <SvgXml xml={deleteIcon} />
                </TouchableOpacity>
            </View>
            <Text style={tw`text-gray-400 text-sm`}>{job.company}</Text>
            <Text style={tw`text-gray-500 text-xs mt-1`}>{job.location} · {job.type}</Text>
            <Text style={tw`text-green-400 font-bold text-sm mt-1`}>{job.salary}</Text>
            <View style={tw`flex-row items-center gap-2 mt-3`}>
                <View style={tw`py-1 px-3 rounded-md ${statusStyles[job.status]}`}>
                    <Text style={tw`font-bold text-xs`}>{job.status}</Text>
                </View>
                <TouchableOpacity style={tw`flex-row items-center gap-2 py-1 px-3 rounded-md border border-white`}>
                    <MaterialIcon name="edit" size={14} color="white" />
                    <Text style={tw`text-white font-bold text-xs`}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};



const Gallery: React.FC<{ images: string[]; onAddImage: () => void }> = ({ images, onAddImage }) => {
    return (
        <View style={tw`bg-[#3A3E41] p-4 rounded-lg`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
                <Text style={tw`text-white text-xl font-bold`}>Gallery</Text>
                <TouchableOpacity>
                    <SvgXml xml={editicon} />
                </TouchableOpacity>
            </View>
            <View style={tw`flex-row flex-wrap justify-between`}>
                {images.map((uri, index) => (
                    <Image
                        key={index}
                        source={require('../../assets/images/postimg1.png')}
                        style={tw`w-[32%] h-44 rounded mb-2`}
                    />
                ))}
                <TouchableOpacity style={tw`w-[32%] h-44 rounded mb-2 bg-gray-700 items-center justify-center`} onPress={onAddImage}>
                    <Icon name="plus" size={24} color="white" />
                    <Text style={tw`text-white mt-2`}>Add New</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


// --- Main Business Profile Screen ---
const BusinessProfileScreen = () => {
    const [userData, setUserData] = useState({
        name: 'Creative Studio Inc.',
        title: 'Theater Company',
        location: 'Dhaka, Bangladesh',
        avatar: 'https://placehold.co/93x93/EFEFEF/3A3E41?text=CS',
        cover: 'https://placehold.co/440x188/cccccc/3A3E41?text=Cover',
        stats: { followers: '1245', views: '250', clicks: '12' },
        about: 'Passionate software engineer with 5+ years of experience building scalable web applications and leading development teams. I specialize in modern JavaScript frameworks and cloud technologies.',
        experience: [
            { title: 'Senior Software Engineer', company: 'Zetanest', duration: '2022 - Present', location: 'Dhaka, Bangladesh', description: 'Leading frontend development for enterprise SaaS applications.', logo: 'https://placehold.co/37x37/EFEFEF/3A3E41?text=Z' },
            { title: 'Software Engineer', company: 'InnovateLab', duration: '2021 - 2022', location: 'Dhaka, Bangladesh', description: 'Developed and maintained web applications.', logo: 'https://placehold.co/37x37/EFEFEF/3A3E41?text=I' },
        ],
        education: { degree: 'B.Sc. in Computer Science', university: 'University of Dhaka', duration: '2016-2020', logo: 'https://placehold.co/50x52/EFEFEF/3A3E41?text=UD' },
        skills: ['Javascript', 'Typescript', 'React', 'Node.js', 'Python'],
    });

    const [galleryImages, setGalleryImages] = useState([
        'https://placehold.co/127x178/EFEFEF/3A3E41?text=1',
        'https://placehold.co/127x178/EFEFEF/3A3E41?text=2',
        'https://placehold.co/127x178/EFEFEF/3A3E41?text=3',
    ]);

    const [jobPostings, setJobPostings] = useState<Job[]>([
        { id: '1', title: 'Concept Artist', company: 'Theater Company', location: 'San Francisco, CA', type: 'Full-Time', salary: '$140k - $180k', posted: '2 days ago', description: 'We are looking for a Senior Product Designer...', status: 'Approved' },
        { id: '2', title: 'Concept Artist', company: 'Theater Company', location: 'San Francisco, CA', type: 'Full-Time', salary: '$140k - $180k', posted: '2 days ago', description: 'We are looking for a Senior Product Designer...', status: 'Pending' },
    ]);

    const handleImagePick = async (type: 'avatar' | 'cover' | 'gallery') => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: 'image/*' });
            if (!result.canceled && result.assets) {
                const file = result.assets[0];
                if (type === 'avatar') {
                    setUserData(prev => ({ ...prev, avatar: file.uri }));
                } else if (type === 'cover') {
                    setUserData(prev => ({ ...prev, cover: file.uri }));
                } else if (type === 'gallery') {
                    setGalleryImages(prev => [...prev, file.uri]);
                }
            }
        } catch (err) {
            console.error('Error picking image:', err);
        }
    };

    const handleDeleteJob = (id: string) => {
        Alert.alert(
            "Delete Job Post",
            "Are you sure you want to delete this job posting?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => setJobPostings(prev => prev.filter(job => job.id !== id)) }
            ]
        );
    };

    return (
        <ScrollView style={tw`flex-1 bg-[#0F0E13]`}>
            <View>
                <TouchableOpacity onPress={() => handleImagePick('cover')}>
                    <Image source={require('../../assets/images/postimg1.png')} style={tw`w-full h-48`} />
                    <SvgXml style={tw`absolute bottom-2 right-8`} xml={editImageicon} />
                </TouchableOpacity>
                <View style={tw`bg-[#3A3E41] p-4 pt-16`}>
                    <View style={tw`flex-row items-center justify-center gap-2`}>
                        <Text style={tw`text-white text-2xl font-bold`}>{userData.name}</Text>
                        <SvgXml xml={verifiedbadge} />
                    </View>
                    <Text style={tw`text-gray-400 text-sm text-center`}>{userData.title}</Text>
                    <View style={tw`flex-row items-center justify-center gap-1`}>
                        <Icon name="map-marker" size={14} color="#989898" />
                        <Text style={tw`text-gray-400 text-sm`}>{userData.location}</Text>
                    </View>
                </View>
                <View style={tw`absolute top-0 w-full mt-32`}>
                    <View style={tw`items-center`}>
                        <TouchableOpacity onPress={() => handleImagePick('avatar')}>
                            <Image source={require('../../assets/images/postimg1.png')} style={tw`w-24 h-24 rounded-full border-4 border-[#3A3E41]`} />
                            <SvgXml style={tw`absolute bottom-2 right-0`} xml={editImageicon} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push('/Edit_business_profile')} style={tw`absolute -bottom-4 right-4 bg-[#4593F5] py-1.5 px-3 rounded-md flex-row items-center gap-2`}>
                            <SvgXml xml={editicon} />
                            <Text style={tw`text-white font-semibold text-xs`}>Edit profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

            <View style={tw`bg-[#3A3E41] py-4 flex-row justify-around items-center border-y border-gray-700`}>
                <StatItem icon="users" value={userData.stats.followers} label="New Followers" />
                <StatItem icon="eye" value={userData.stats.views} label="Profile views" />
                <StatItem icon="briefcase" value={userData.stats.clicks} label="Job post clicks" />
            </View>

            <View style={tw`p-4`}>
                <InfoCard title="About">
                    <Text style={tw`text-gray-300`}>{userData.about}</Text>
                </InfoCard>
                <InfoCard title="Experience" isPrivate>
                    {userData.experience.map((exp, index) => <ExperienceItem key={index} {...exp} />)}
                </InfoCard>
                <Gallery images={galleryImages} onAddImage={() => handleImagePick('gallery')} />
                <View style={tw`mt-6`}>
                    <View style={tw`flex-row justify-between items-center mb-4`}>
                        <Text style={tw`text-white text-xl font-bold`}>Job Postings</Text>
                        <TouchableOpacity onPress={() => router.push('/(screens)/Post_A_job')} style={tw`bg-[#4593F5] py-1 px-3 rounded-md flex-row items-center gap-2`}>
                            <Icon name="plus" size={14} color="white" />
                            <Text style={tw`text-white font-semibold text-xs`}>Post a new Job</Text>
                        </TouchableOpacity>
                    </View>
                    {jobPostings.map(job => <JobPostingCard key={job.id} job={job} onDelete={handleDeleteJob} />)}
                </View>
            </View>
        </ScrollView>
    );
};

export default BusinessProfileScreen;
