import Axios from "axios";

const useChat = () => {
    const getChat = async (message: string) => {
        try {
            const response = await Axios.post('http://127.0.0.1:8000/chat', { message });
            return response.data;
        } catch (error) {
            return 'Sorry, I did not understand that. Please try again.';
        }
    };
    return { getChat };
};
export default useChat;
