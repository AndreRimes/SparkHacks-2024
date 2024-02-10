import Image from "next/image"
import plant from "../../public/plant.png"
import logoutImg from "../../public/logout.png"
import Link from "next/link"
import { useUser } from "@/Domain/context/userContext"
import useAuth from "@/Domain/hooks/useAuth"
import { useRouter } from "next/navigation"
import profilePic from "../../public/user.png"
import { useState } from "react"



export default function Navbar() {
    const { user, getUrl, search } = useUser()
    const { logout } = useAuth();
    const router = useRouter()
    const [accounts, setAccounts] = useState([])
    const [searchInput, setSearchInput] = useState("");



    function handleLogout() {
        logout()
        router.push("/login")
    }

    async function handleSearch(e) {
        setSearchInput(e.target.value);
        
        let typingTimer;
        const delay = 500;

        clearTimeout(typingTimer);

        typingTimer = setTimeout(async () => {
            const res = await search(e.target.value);
            setAccounts(res);
        }, delay);
    }

    return (
        <div className="w-screen  h-[13%] py-2 bg-primary flex flex-row items-center justify-between m-0">
            <Link href="/">
                <div className="w-[4vw] h-[4vw] rounded-full bg-[#f5f5dc] flex items-center justify-center ml-3">
                    <Image src={plant} alt="logo" width={35} height={35} className="w-[75%] h-[75%]" />
                </div>
            </Link>

            <div className="h-full w-[30%] flex flex-row items-center justify-evenly">
                <div className="relative flex flex-col">
                    <input
                        onChange={(e) => handleSearch(e)}
                        type="text"
                        placeholder="Search: "
                        value={searchInput}
                        className="input input-primary h-[8vh]"
                    />
                    {accounts.length > 0 && searchInput !== "" && (
                        <div className="bg-white absolute translate-y-[9vh] w-full p-2 rounded-lg flex flex-col">
                            {accounts.map((account) => (
                                <Link key={account.id} className="hover:border-2 rounded-xl p-2" href={`/profile/${account.id}`}>
                                    {account.username}
                                </Link>
                            ))}
                        </div>
                    )}

                </div>
                <Link href={`/profile/${user?.id}`}>
                    {user?.photo ? (
                        <Image src={getUrl(user)} alt="profile picture" width={50} height={50} className="rounded-full w-[4vw] h-[4vw] hover:scale-110 transition-all duration-200 ease-out" />
                    ) : (
                        <Image src={profilePic} alt="profile picture" width={50} height={50} className="rounded-full w-[4vw] h-[4vw] hover:scale-110 transition-all duration-200 ease-out" />
                    )}
                </Link>
                <Image onClick={handleLogout} src={logoutImg} alt="Configuration" width={50} height={50} className="w-[2.5vw] h-[2.5vw] hover:scale-110 transition-all duration-200 ease-out cursor-pointer" />
            </div>
        </div>
    )
}