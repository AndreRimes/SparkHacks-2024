"use client"
import { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import { useUser } from '@/Domain/context/userContext';
import Post from '@/components/Post';
import ProfileInfo from '@/components/Profile';

export default function Profile({ params }) {
    const [profileUser, setProfileUser] = useState(null)
    const [posts, setPosts] = useState([])
    const { getPostByUser, getUserById } = useUser()

    useEffect(() => {
        async function fetchData() {
            const user = await getUserById(params.id);
            const post = await getPostByUser(user);
            setPosts(post);
            setProfileUser(user);
        }

        fetchData()
    }, [])

    return (
        <div className="w-screen h-screen flex flex-col items-center">
            <Navbar />

            <div className="w-1/2 h-full border-l-2 border-r-2 flex flex-col items-center px-5 py-2 overflow-y-auto">
                <ProfileInfo profileUser={profileUser} />
                {posts && posts.map((post) => {
                    return (
                        <Post post={post} />
                    )
                })}
            </div>
        </div>
    )
}