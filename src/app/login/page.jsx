"use client"
import { useRef } from 'react';
import Image from "next/image";
import plantImage from "../../../public/plant.png";
import Link from "next/link";
import useAuth from '@/Domain/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useUser } from '@/Domain/context/userContext';



export default function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const { login } = useAuth();
    const {fetchData} = useUser();
    const router = useRouter();
    

    const handleLogin = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        try {
            const user = await login({ email, password });
            fetchData();
            router.push("/")
        } catch (e) {
            console.log(e)
        }

    };

    return (
        <div className="w-screen h-screen flex items-center justify-center ">
            <div className="w-1/3 border-4 rounded-lg  h-4/5 flex flex-col items-center justify-evenly p-5">
                <h1 className="text-lg font-bold">Login</h1>
                <Image src={plantImage} alt="plant" width={90} height={90} className="w-[7vw] h-[7vw]" />

                <div className="w-full h-1/3 flex flex-col  items-center justify-evenly">
                    <input ref={emailRef} className="input input-primary font-semibold" type="email" placeholder="Email: " />
                    <input ref={passwordRef} className="input input-primary font-semibold" type="password" placeholder="Password: " />
                </div>
                <div className="w-2/3 flex flex-col justify-center">
                    <Link className="text-sm pb-2" href={"/signup"}>Don't Have an Account?</Link>
                    <Link className="text-sm pb-2" href={"/login"}>Forget About Your Password</Link>
                </div>

                <button onClick={handleLogin} className="btn btn-primary w-2/3 hover:scale-110 "> Sign UP</button>
            </div>
        </div>
    );
}
