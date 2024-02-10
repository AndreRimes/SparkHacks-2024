import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/Domain/context/userContext";
import flames from "../../public/flames.png";
import profilePic from "../../public/user.png";

export default function Post({ post }) {
    const { getUrl } = useUser();


    const formattedDate = new Date(post.created).toLocaleDateString("en-US");


    const renderUserProfile = () => (
        <Link href={`/profile/${post?.user?.id}`} className="font-semibold py-2 pr-3 flex flex-row items-center">
            <Image
                src={post?.user?.photo ? getUrl(post.user) : profilePic}
                alt="profile picture"
                width={50}
                height={50}
                className="rounded-full w-[2.5vw] h-[2.5vw] mr-2 hover:scale-110 transition-all duration-200 ease-out"
            />
            {post?.user?.username}
        </Link>
    );

    const renderPostDetails = () => (
        <div className="flex flex-col items-center justify-center ">
            <div className="flex flex-row  mr-2 text-sm ">
                <p>{post?.user?.streak}</p>
                <Image src={flames} alt="flames" width={20} height={20} className="" />
            </div>
            <p className="text-sm opacity-70">{formattedDate}</p>
        </div>
    );

    return (
        <div key={post.id} className="w-3/4 h-[55vh] border-4 rounded-lg flex flex-col items-center justify-center mt-5 p-2">
            <div className="flex flex-row items-center justify-between w-2/3">
                {renderUserProfile()}
                {renderPostDetails()}
            </div>
            <Image src={getUrl(post)} alt="photo" width={200} height={200} className="w-2/3 h-2/3" />
            <p className="w-2/3 h-1/3 py-1 max-h-[40%] overflow-hidden">
                <b>{post.user.username}</b>: {post?.caption}
            </p>
        </div>
    );
}
