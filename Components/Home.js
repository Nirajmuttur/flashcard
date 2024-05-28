import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { Audio } from 'expo-av';
export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [details, setDetails] = useState({
        word: '',
        meaning: [],
        pronunciation: '',
        example: [],
        audio: '',
        error: ''
    });

    const fetchMeaningAndPronunciation = async () => {
        if (!details.word.trim()) {
            setDetails({ ...details, error: 'Please enter a word.' });
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/generate/${details.word}`);
            if (response.status === 200) {
                const data = response.data.data;
                const meanings = data.meaning
                const examples = data.example
                const pronunciation = data?.phonetics || 'Pronunciation not available';
                const audio = data?.audio || '';

                setDetails({
                    ...details,
                    meaning: meanings,
                    pronunciation,
                    example: examples,
                    audio,
                    error: ''
                });
            } else {
                setDetails({
                    ...details,
                    word: '',
                    meaning: [],
                    pronunciation: '',
                    example: [],
                    audio: '',
                    error: 'Word not found.'
                });
            }
        } catch (error) {
            setDetails({
                ...details,
                word: '',
                meaning: [],
                pronunciation: '',
                example: [],
                audio: '',
                error: 'Error fetching the word meaning.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const clearInput = () => {
        setDetails({
            word: '',
            meaning: [],
            pronunciation: '',
            example: [],
            audio: '',
            error: ''
        });
    };

    const playAudio = async (audioUri) => {
        if (audioUri) {
            const { sound } = await Audio.Sound.createAsync(
                { uri: audioUri },
                { shouldPlay: true }
            );
            await sound.playAsync();
        }
    };

    const handleWordChange = (word) => {
        clearInput();
        setDetails({ ...details, word });
    };

    const toggleBookmark = () => {
        
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>BrightCard</Text>
            <View style={styles.content}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter a word"
                        value={details.word}
                        onChangeText={handleWordChange}
                    />
                    <TouchableOpacity style={styles.clearButton} onPress={clearInput}>
                        <Icon name="close" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.searchButton} onPress={fetchMeaningAndPronunciation} disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                        <>
                            <Icon name="search" size={20} color="#FFFFFF" />
                            <Text style={styles.buttonText}>Search</Text>
                        </>
                    )}
                </TouchableOpacity>

                {details.meaning.length > 0 && (
                    <View style={styles.flashcard}>
                        <ScrollView>
                            <View style={styles.titlebookMark}>
                                <Text style={styles.flashcardTitle}>{details.word}</Text>
                                <TouchableOpacity onPress={toggleBookmark}>
                                    <Icon name="bookmark-outline" size={28} color="#00ADB5" />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.flashcardText}>Meanings:</Text>
                            {details.meaning.map((meaning, index) => (
                                <Text key={index} style={styles.flashcardItem}>{index + 1}. {meaning}</Text>
                            ))}

                            <Text style={styles.flashcardText}>Pronunciation: {details.pronunciation}</Text>
                            <Text style={styles.flashcardText}>Examples:</Text>
                            {details.example.map((example, index) => (
                                <Text key={index} style={styles.flashcardItem}>{index + 1}. {example}</Text>
                            ))}

                            {details.audio && (
                                <TouchableOpacity onPress={() => playAudio(details.audio)}>
                                    <Text style={styles.flashcardTextAudio}>🔊 Listen</Text>
                                </TouchableOpacity>
                            )}
                        </ScrollView>
                    </View>
                )}

                {details.error && (
                    <Text style={styles.error}>{details.error}</Text>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#333333',
        alignSelf: 'center',
    },
    content: {
        flex: 1,
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: '#F5F5F5',
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#333333',
    },
    clearButton: {
        marginLeft: 10,
        backgroundColor: '#DC3545',
        borderRadius: 25,
        padding: 10,
    },
    searchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00ADB5',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 25,
        elevation: 3,
        marginTop: 10,
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    flashcard: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        width: '100%',
        flex: 1,
    },
    titlebookMark:{
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    flashcardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333',
    },
    flashcardText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#333333',
    },
    flashcardItem: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333333',
        marginLeft: 10,
    },
    flashcardTextAudio: {
        fontSize: 18,
        color: '#007BFF',
        textDecorationLine: 'underline',
        marginTop: 10,
    },
    error: {
        marginTop: 20,
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});
