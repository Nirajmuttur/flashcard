import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { Audio } from 'expo-av';
export default function App() {
    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState('');
    const [pronunciation, setPronunciation] = useState('');
    const [example, setExample] = useState('');
    const [audio, setAudio] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchMeaningAndPronunciation = async () => {
        if (!word.trim()) {
            setError('Please enter a word.');
            setMeaning('');
            setPronunciation('');
            setExample('');
            setAudio('');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (response.status === 200 && response.data.length > 0) {
                const data = response.data[0];
                const meaningData = data.meanings[0].definitions[0];
                setMeaning(meaningData.definition);
                setPronunciation(data.phonetics[0]?.text || 'Pronunciation not available');
                setExample(meaningData.example || 'Example not available');
                setAudio(data.phonetics[1]?.audio || '');
                setError('');
            } else {
                setError('Word not found.');
                setMeaning('');
                setPronunciation('');
                setExample('');
                setAudio('');
            }
        } catch (error) {
            console.log(error)
            setError('Error fetching the word meaning.');
            setMeaning('');
            setPronunciation('');
            setExample('');
            setAudio('');
        } finally {
            setIsLoading(false);
        }
    };

    const clearInput = () => {
        setWord('');
        setMeaning('');
        setPronunciation('');
        setExample('');
        setAudio('');
        setError('');
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

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>BrightCard</Text>
            <View style={styles.content}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter a word"
                        value={word}
                        onChangeText={setWord}
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

                {meaning ? (
                    <View style={styles.flashcard}>
                        <Text style={styles.flashcardTitle}>{word}</Text>
                        <Text style={styles.flashcardText}>Meaning: {meaning}</Text>
                        <Text style={styles.flashcardText}>Pronunciation: {pronunciation}</Text>
                        <Text style={styles.flashcardText}>Example: {example}</Text>
                        {audio ? (
                            <TouchableOpacity onPress={()=>playAudio(audio)}>
                                <Text style={styles.flashcardTextAudio}>🔊 Listen</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                ) : null}

                {error ? (
                    <Text style={styles.error}>{error}</Text>
                ) : null}
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
        marginTop: 60, 
        justifyContent: 'flex-start',
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
    },
    flashcardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333',
    },
    flashcardText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333333',
    },
    flashcardTextAudio: {
        fontSize: 16,
        marginBottom: 5,
        color: '#007BFF',
        textDecorationLine: 'underline',
    },
    error: {
        marginTop: 20,
        color: 'red',
        fontSize: 16,
    },
});
