import { useState } from 'react';
import Image from "next/image"
import { useUser } from "@/Domain/context/userContext"
import Modal from "./Modal";
import profilePic from "../../public/user.png"

export default function ProfileInfo({ profileUser }) {
    const { getUrl, follow, unfollow, user } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleClick() {
        follow(profileUser);
    }

    function handleClickImg() {
        if (user.id === profileUser.id) {
            setIsModalOpen(true);
        }
    }

    function handleUnf() {
        unfollow(profilePic);
    }

    return (
        <>
            {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} isProfile={true} />}
            <div className="w-full h-1/3 min-h-[30vh] border-b-2 flex flex-row items-center justify-evenly">
                {
                    profileUser?.photo ? (
                        <div onClick={handleClickImg}>
                            <Image src={getUrl(profileUser)} alt="profile picture" width={100} height={100} className={`rounded-full w-[8vw] h-[8vw] ${user?.id === profileUser?.id ? "cursor-pointer" : ""}`} />
                        </div>
                    ) : (
                        <div onClick={handleClickImg}>
                            <Image src={profilePic} alt="profile picture" width={100} height={100} className={`rounded-full  ${user?.id === profileUser?.id ? "cursor-pointer" : ""}`} />
                        </div>
                    )
                }
                <div className='w-1/2'>
                    <h1><b>Name</b>: {profileUser?.username}</h1>
                    <p><b>Streak</b>: {profileUser?.streak}</p>
                    <p className='max-w-full max-h-[12vh] overflow-hidden'><b>Bio</b>:  {profileUser?.bio}</p>
                    {
                        user?.id !== profileUser?.id && (
                            !user?.following?.includes(profileUser?.id) ? (
                                <button onClick={handleClick} className={`mt-2 btn btn-primary btn-sm w-full `}>
                                    Follow
                                </button>
                            ) : (
                                <button onClick={handleUnf} className={`mt-2 btn btn-sm w-full `}>
                                    Unfollow
                                </button>
                            )
                        )
                    }
                </div>

            </div>
        </>
    )


}