import tw from '@/lib/tailwind';
import { Job } from '@/lib/types/type';
import { useState } from 'react';

import { FlatList, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/ui/Header';
import JobCard from '../components/ui/JobCard';

// --- Type Definitions ---

interface Filters {
    sortBy: 'Newest' | 'Most Relevant';
    jobType: string[];
    category: string[];
    location: string[];
}

// --- Reusable Components ---



const FilterModal: React.FC<{ visible: boolean; onClose: () => void; onApply: (filters: Filters) => void; }> = ({ visible, onClose, onApply }) => {
    const [filters, setFilters] = useState<Filters>({
        sortBy: 'Newest',
        jobType: ['Full-Time'],
        category: ['Music'],
        location: ['San Francisco, CA'],
    });

    const toggleMultiSelect = (field: keyof Filters, value: string) => {
        const currentValues = filters[field] as string[];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        setFilters(prev => ({ ...prev, [field]: newValues }));
    };

    const resetFilters = () => {
        setFilters({ sortBy: 'Newest', jobType: [], category: [], location: [] });
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <TouchableOpacity style={tw`flex-1 justify-end bg-black bg-opacity-50`} onPress={onClose} activeOpacity={1}>
                <TouchableOpacity activeOpacity={1} style={tw`bg-[#3A3E41] rounded-t-3xl pt-20`}>
                    <View style={tw`items-center py-3`}>
                        <View style={tw`w-16 h-1.5 bg-gray-500 rounded-full`} />
                    </View>
                    <ScrollView contentContainerStyle={tw`p-6 `}>
                        <Text style={tw`text-white text-xl font-bold mb-4`}>Filters</Text>

                        <FilterSection title="Sort By">
                            <RadioOption label="Newest" selected={filters.sortBy === 'Newest'} onSelect={() => setFilters(prev => ({ ...prev, sortBy: 'Newest' }))} />
                            <RadioOption label="Most Relevant" selected={filters.sortBy === 'Most Relevant'} onSelect={() => setFilters(prev => ({ ...prev, sortBy: 'Most Relevant' }))} />
                        </FilterSection>

                        <FilterSection title="Job Type">
                            {['Full-Time', 'Part-Time', 'Contract', 'Internship'].map(type => (
                                <CheckboxOption key={type} label={type} selected={filters.jobType.includes(type)} onSelect={() => toggleMultiSelect('jobType', type)} />
                            ))}
                        </FilterSection>

                        <FilterSection title="Category">
                            {['Music', 'Painting', 'Acting', 'Dancing'].map(cat => (
                                <CheckboxOption key={cat} label={cat} selected={filters.category.includes(cat)} onSelect={() => toggleMultiSelect('category', cat)} />
                            ))}
                        </FilterSection>

                        <FilterSection title="Location">
                            {['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Chicago, IL'].map(loc => (
                                <CheckboxOption key={loc} label={loc} selected={filters.location.includes(loc)} onSelect={() => toggleMultiSelect('location', loc)} />
                            ))}
                        </FilterSection>
                    </ScrollView>
                    <View style={tw`flex-row justify-center gap-4 p-4 border-t border-gray-700`}>
                        <TouchableOpacity style={tw`py-2 px-12 rounded-full border border-gray-500`} onPress={resetFilters}>
                            <Text style={tw`text-white font-bold`}>Reset All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={tw`bg-[#4593F5] py-2 px-12 rounded-full border border-white`} onPress={() => onApply(filters)}>
                            <Text style={tw`text-white font-bold`}>Apply Filters</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <View style={tw`mb-6`}>
        <Text style={tw`text-white text-lg font-semibold mb-2`}>{title}</Text>
        {children}
    </View>
);

const RadioOption: React.FC<{ label: string; selected: boolean; onSelect: () => void }> = ({ label, selected, onSelect }) => (
    <TouchableOpacity style={tw`flex-row items-center gap-4 py-1.5`} onPress={onSelect}>
        <View style={tw`w-6 h-6 rounded-full border-2 ${selected ? 'border-blue-500' : 'border-white'} items-center justify-center`}>
            {selected && <View style={tw`w-3 h-3 bg-blue-500 rounded-full`} />}
        </View>
        <Text style={tw`text-white text-base`}>{label}</Text>
    </TouchableOpacity>
);

const CheckboxOption: React.FC<{ label: string; selected: boolean; onSelect: () => void }> = ({ label, selected, onSelect }) => (
    <TouchableOpacity style={tw`flex-row items-center gap-4 py-1.5`} onPress={onSelect}>
        <View style={tw`w-6 h-6 border-2 ${selected ? 'bg-blue-500 border-blue-500' : 'border-white'} items-center justify-center`}>
            {selected && <Icon name="check" size={14} color="white" />}
        </View>
        <Text style={tw`text-white text-base`}>{label}</Text>
    </TouchableOpacity>
);


// --- Main Jobs Screen ---
const JobsScreen = () => {
    const [activeTab, setActiveTab] = useState('All jobs');
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [jobs, setJobs] = useState<Job[]>([
        { id: '1', title: 'Senior Product Designer', company: 'Figma', logo: 'https://placehold.co/50x50/EFEFEF/3A3E41?text=F', location: 'San Francisco, CA', type: 'Full-Time', salary: '$140k - $180k', posted: '2 days ago', description: 'We are looking for a Senior Product Designer...', isOnline: true },
        { id: '2', title: 'Frontend Developer', company: 'Google', logo: 'https://placehold.co/50x50/EFEFEF/3A3E41?text=G', location: 'New York, NY', type: 'Full-Time', salary: '$120k - $160k', posted: '3 days ago', description: 'Join our team to build amazing web experiences.', isRemote: true },
    ]);

    const handleApplyFilters = (filters: Filters) => {
        console.log("Applying filters:", filters);
        // Here you would typically filter the `jobs` state based on the selected filters.
        setFilterModalVisible(false);
    };

    return (
        <View style={tw`flex-1 bg-[#0F0E13]`}>
            <Header searchStatus searchPlaceholder='Search jobs,companies' />
            <FlatList
                data={jobs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <JobCard job={item} />}
                ListHeaderComponent={
                    <>
                        <View style={tw`p-4`}>
                            <Text style={tw`text-white text-xl font-bold`}>Jobs</Text>
                        </View>
                        <View style={tw`flex-row items-center gap-2 px-4 py-3`}>
                            {["All jobs", "Applied jobs", "Saved jobs", "Filters"].map(tab => (
                                <TouchableOpacity
                                    key={tab}
                                    style={tw`p-2 rounded-md border border-gray-500 ${activeTab === tab ? 'bg-[#3A3E41]' : ''}`}
                                    onPress={() => tab === 'Filters' ? setFilterModalVisible(true) : setActiveTab(tab)}
                                >
                                    <Text style={tw`text-white text-xs font-semibold`}>{tab}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                }
                contentContainerStyle={tw`p-2`}
            />
            <FilterModal
                visible={isFilterModalVisible}
                onClose={() => setFilterModalVisible(false)}
                onApply={handleApplyFilters}
            />
        </View>
    );
};

export default JobsScreen;
