import { useState } from "react";
import Modal from "./Modal";




export default function PhotoInput() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
            <div className="w-2/3 h-[15vh] bg-primary rounded-lg flex flex-row items-center
            hover:scale-110 transition-all duration-300 ease-out cursor-pointer sticky"
                onClick={() => setIsModalOpen(true)}
            >

                <p className="cursor-pointer text-5xl pl-10 font-bold mb-1">+</p>
                <h1 className="cursor-pointer px-10 text-xl font-semibold">Publish a New  Photo</h1>

            </div>
        </>
    )

}