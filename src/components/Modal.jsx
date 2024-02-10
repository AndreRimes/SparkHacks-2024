import React, { useState } from "react";
import Overlay from "./Overlay";
import Image from "next/image";
import { useUser } from "@/Domain/context/userContext";

export default function Modal({ setIsModalOpen, isProfile }) {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [caption, setCaption] = useState("");
    const { user, createPost, updateProfiePicture } = useUser();

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();

        const droppedFile = e.dataTransfer.files[0];

        setSelectedFile(droppedFile);
        setIsDragging(false);

        const url = URL.createObjectURL(droppedFile);
        setImageUrl(url);

    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handlePublish = async () => {
        const formData = new FormData();
        formData.append('photo', selectedFile);


        if (!isProfile) {
            formData.append('user', user.id);
            formData.append('caption', caption);

            try {
                const res = await createPost(formData);
            } catch (err) {
                console.error(err);
            }
        } else {
            try {
                const data = {
                    ...user,
                    photo: selectedFile,
                }
                const res = await updateProfiePicture(data);
            } catch (err) {
                console.error(err);
            }
        }

        setIsModalOpen(false);
    }

    return (
        <Overlay setIsModalOpen={setIsModalOpen}>
            <div
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={(e) => e.stopPropagation()}
                className={`w-1/2 h-4/5 bg-[#f5f5dc] rounded-lg flex flex-col items-center justify-evenly ${isDragging ? "border-dashed border-2 border-blue-500" : ""
                    }`}
            >
                <label htmlFor="imageInput" className="w-2/3 h-2/3 cursor-pointer">
                    <div className="w-full h-full rounded-lg border-2 border-dashed border-black flex items-center justify-center p-5">
                        {imageUrl ? (
                            <Image src={imageUrl} alt="Selected" className="w-full h-full rounded-lg" width={100} height={100} />
                        ) : (
                            <h2>Drag and Drop your image</h2>
                        )}
                    </div>
                </label>

                <input
                    type="file"
                    id="imageInput"
                    className="hidden"
                    onChange={(e) => {
                        const selectedFile = e.target.files[0];
                        setSelectedFile(selectedFile);

                        const url = URL.createObjectURL(selectedFile);
                        setImageUrl(url);
                    }}
                />

                {!isProfile &&
                    <input
                        type="text"
                        placeholder="Add caption"
                        value={caption}
                        onChange={handleCaptionChange}
                        className="input input-primary w-2/3"
                    />
                }

                <button onClick={handlePublish} className="btn btn-primary w-2/3 text-[#f5f5dc] hover:scale-105">
                    {isProfile ? "Save" : "Publish"}
                </button>
            </div>
        </Overlay>
    );
}
