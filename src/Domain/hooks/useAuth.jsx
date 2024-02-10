import pb from '../pocketbase/pocketbase';
import { redirect } from 'next/navigation'

export default function useAuth() {

    function logout() {
        pb.authStore.clear()
    }

    function isLoged() {
        if (!pb.authStore.isValid || !pb.authStore?.model?.id) {
            return false
        }
        return true
    }

    async function login({ email, password }) {
        try {
            const user = await pb.collection('users').authWithPassword(email, password);
            return user
        } catch (e) {
            console.log(e)
        }
    }

    async function signup(data) {
        try {
            const user = await pb.collection('users').create(data);
            return user
        } catch (e) {
            return e
        }
    }

    return { signup, login, isLoged, logout};
}