"use client"
import Image from "next/image";
import plantImage from "../../../public/plant.png";
import Link from "next/link";
import { useState, useRef } from "react";
import useAuth from "@/Domain/hooks/useAuth";
import { useRouter } from 'next/navigation'

export default function SignUp() {
    const router = useRouter()
    const { signup } = useAuth();
    // const [loading, setLoading] = useState(false);
    const emailRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    async function handleClick() {
        const data = {
            "username": usernameRef.current.value,
            "email": emailRef.current.value,
            "emailVisibility": true,
            "password": passwordRef.current.value,
            "passwordConfirm": passwordRef.current.value,
            "name": usernameRef.current.value,
        };
        try {
            await signup(data);
            router.push("/login")
        } catch (e) {
            console.log("ERROR", e)
        }
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-1/3 border-4 rounded-lg h-4/5 flex flex-col items-center justify-evenly p-5">
                <h1 className="text-lg font-bold">Sign Up</h1>
                <Image src={plantImage} alt="plant" width={90} height={90} className="w-[7vw] h-[7vw]" />

                <div className="w-full h-1/2 flex flex-col items-center justify-evenly">
                    <input
                        ref={emailRef}
                        className="input input-primary font-semibold"
                        type="email"
                        placeholder="Email: "
                    />
                    <input
                        ref={usernameRef}
                        className="input input-primary font-semibold"
                        type="text"
                        placeholder="Username: "
                    />
                    <input
                        ref={passwordRef}
                        className="input input-primary font-semibold"
                        type="password"
                        placeholder="Password: "
                    />
                </div>
                <Link className="text-sm pb-2" href={"/login"}>
                    Already have an account?{" "}
                </Link>

                <button className="btn btn-primary w-2/3 hover:scale-110" onClick={handleClick}>
                    Create Account
                </button>
            </div>
        </div>
    );
}
