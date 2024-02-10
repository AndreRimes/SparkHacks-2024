"use client"
import { useEffect } from "react"
import useAuth from "@/Domain/hooks/useAuth"
import { useRouter } from 'next/navigation';
import { useUser } from "@/Domain/context/userContext";
import Navbar from "@/components/Navbar";
import PhotoInput from "@/components/PhotoInput";
import Post from "@/components/Post";


export default function main() {
    const { isLoged, logout } = useAuth();
    const { posts } = useUser();
    const router = useRouter();


    useEffect(() => {
        if (!isLoged()) {
            router.push('/login');
        }
    }, []);


    return (
        <div className="w-screen h-screen flex flex-col items-center">
            <Navbar />

            <div className="w-1/2 h-full border-l-2 border-r-2 flex flex-col items-center px-5
                py-2 over overflow-y-auto">
                <PhotoInput />
                {posts && posts.map((post) => {
                    return (
                        <Post post={post} />
                    )
                })}

            </div>
        </div>
    )

}