import axios from 'axios'
const fetchWordDetails = async (word) => {
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = response.data[0];
        let meaning = []
        let example= []
        response.data[0].meanings.forEach((element) => {
            meaning = element.definitions.map((obj) => obj.definition);
            example = element.definitions.map((obj) => obj.example).filter((n) => n) || '';
        });
        const audio = data.phonetics[0]?.audio || '';
        const phonetics = data.phonetics[0]?.text || ''
        return { word, meaning, example, audio, phonetics };
    } catch (error) {
        throw error.message
    }
};

export const generateFlashcard = async (word) => {
    try {
        const data = await fetchWordDetails(word);
        return data
    } catch (error) {
        throw error.message
    }
};