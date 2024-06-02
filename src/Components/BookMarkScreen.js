import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Modal, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchBookmarks, removeBookmark } from '../service/bookMarkService';
import { useAuth } from './../Provider/AuthContext'
import { Audio } from 'expo-av';
export default function BookMarkScreen() {
    const [selectedBookmark, setSelectedBookmark] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const { user } = useAuth()
    const [bookmarks, setBookmarks] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAudioLoading, setIsAudioLoading] = useState(false);
    const openModal = (bookmark) => {
        setSelectedBookmark(bookmark);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedBookmark(null);
    };

    const getBookmarks = async () => {
        setLoading(true);
        try {
            const bookmark = await fetchBookmarks(user.$id)
            setBookmarks(bookmark)
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    }

    useEffect(() => {
        getBookmarks()
    }, []);

    const refreshBookmarks = () => {
        setIsRefreshing(true);
        getBookmarks();
    };
    const playAudio = async (audioUri) => {
        if (audioUri) {
            setIsAudioLoading(true);
            try {
                const { sound } = await Audio.Sound.createAsync(
                    { uri: audioUri },
                    { shouldPlay: true }
                );
                sound.setOnPlaybackStatusUpdate((status) => {
                    if (!status.isLoaded) {
                        setIsAudioLoading(false); // Stop audio loading if there is an error
                    } else if (status.didJustFinish) {
                        setIsAudioLoading(false); // Stop audio loading when playback finishes
                    }
                });
                await sound.playAsync();
            } catch (error) {
                Alert.alert('Error', 'Error playing audio.');
                setIsAudioLoading(false);
            }

        }
    };

    const renderBookmarkItem = (bookmark) => (
        <TouchableOpacity
            key={bookmark.$id}
            style={styles.bookmarkItem}
            onPress={() => openModal(bookmark)}
        >
            <View style={styles.bookmarkHeader}>
                <Text style={styles.bookmarkWord}>{bookmark.word}</Text>
                <TouchableOpacity onPress={() => handleRemoveBookmark(bookmark.$id)}>
                    <Icon name="bookmark" size={28} color="#00ADB5" />
                </TouchableOpacity>
            </View>
            <View style={styles.bookmarkDetails}>
                <Text style={styles.bookmarkDetailText} numberOfLines={2}>
                    {bookmark.meaning.join(', ')}
                </Text>
                <Text style={styles.bookmarkDetailText} numberOfLines={1}>
                    Pronunciation: {bookmark.pronunciation}
                </Text>
                <Text style={styles.bookmarkDetailText} numberOfLines={2}>
                    {bookmark.example.join(', ')}
                </Text>
            </View>



        </TouchableOpacity>
    );

    const handleRemoveBookmark = async (id) => {
        setLoading(true);
        try {
            const bookmark = await removeBookmark(id)
            setBookmarks((prevBookmarks) => prevBookmarks.filter(bookmark => bookmark.$id !== id));
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Bookmarks</Text>
            <View style={styles.content}>
                {loading ? (
                    <ActivityIndicator size="large" color="#00ADB5" />
                ) : bookmarks.length > 0 ? (
                    <ScrollView style={styles.bookmarkList}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={refreshBookmarks}
                                colors={['#00ADB5']}
                                progressBackgroundColor="#FFFFFF"
                            />
                        }
                    >
                        {bookmarks.map(bookmark => renderBookmarkItem(bookmark))}
                    </ScrollView>
                ) : (
                    <Text style={styles.placeholderText}>No bookmarks yet.</Text>
                )}

                {/* Modal for displaying bookmark details */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <SafeAreaView style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalHeader}>{selectedBookmark?.word}</Text>
                            <ScrollView>
                                <Text style={styles.modalText}>Meanings:</Text>
                                {selectedBookmark?.meaning.map((meaning, index) => (
                                    <Text key={index} style={styles.modalItemText}>{index + 1}. {meaning}</Text>
                                ))}

                                <Text style={styles.modalText}>Pronunciation: {selectedBookmark?.pronunciation}</Text>
                                <Text style={styles.modalText}>Examples:</Text>
                                {selectedBookmark?.example.map((example, index) => (
                                    <Text key={index} style={styles.modalItemText}>{index + 1}. {example}</Text>
                                ))}
                                <TouchableOpacity onPress={() => playAudio(selectedBookmark.audio)}>
                                    {isAudioLoading ? (
                                        <ActivityIndicator size="small" color="#00ADB5" />
                                    ) : (
                                        <Text style={styles.flashcardTextAudio}>🔊 Listen</Text>
                                    )}
                                </TouchableOpacity>
                            </ScrollView>
                            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>

                        </View>
                    </SafeAreaView>
                </Modal>
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
    placeholderText: {
        fontSize: 18,
        color: '#666666',
    },
    bookmarkList: {
        paddingBottom: 20,
    },
    bookmarkItem: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    bookmarkHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bookmarkWord: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
    },
    bookmarkDetails: {
        marginTop: 10,
    },
    bookmarkDetailText: {
        fontSize: 16,
        color: '#333333',
        marginBottom: 5,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        width: '90%',
        maxHeight: '80%',
        elevation: 3,
    },
    modalHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#333333',
    },
    modalItemText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333333',
        marginLeft: 10,
    },
    closeButton: {
        backgroundColor: '#00ADB5',
        paddingVertical: 15,
        borderRadius: 25,
        marginTop: 20,
        alignSelf: 'center',
        width: '50%',
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    flashcardTextAudio: {
        fontSize: 18,
        color: '#007BFF',
        textDecorationLine: 'underline',
        marginTop: 10,
    }
});