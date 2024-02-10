'use client'
import { useEffect, useState } from 'react';
import pb from '../pocketbase/pocketbase';
import React, { createContext, useContext } from 'react';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

    async function getUser() {
        try {
            const result = await pb.collection('users').getOne(pb.authStore.model.id, { expand: 'following' })
            return result
        } catch (err) {
            console.log(err);
            return err
        }
    }

    async function createPost(data) {
        try {
            const result = await pb.collection('posts').create(data)
            setPosts([...posts, result]);
            getFeedPost(user);
            return result
        } catch (err) {
            console.log(err);
            return err
        }
    }

    async function getUserById(id) {
        try {
            const result = await pb.collection('users').getOne(id)
            return result
        } catch (err) {
            console.log(err);
            return err
        }
    }

    async function getFeedPost(user1) {
        let accumulatedPosts = [];

        for (let follow of user1.following) {
            const userObj = await pb.collection('users').getOne(follow);

            const result = await pb.collection('posts').getFullList(10, { filter: `user="${follow}"` });

            const postsWithUserObject = result.map(post => ({ ...post, user: userObj }));

            accumulatedPosts = [...accumulatedPosts, ...postsWithUserObject];
        }

        console.log(accumulatedPosts);

        const res = await pb.collection('posts').getFullList(10, { filter: `user="${user1.id}"` });
        const resWithUserObject = res.map(post => ({ ...post, user: user1 }));

        accumulatedPosts = [...accumulatedPosts, ...resWithUserObject];

        setPosts(accumulatedPosts);
    }



    async function getPostByUser(userObj) {
        try {
            const result = await pb.collection('posts').getFullList(200, { filter: `user="${userObj.id}"` })
            const postsWithUserObject = result.map(post => ({ ...post, user: userObj }));
            return postsWithUserObject
        } catch (err) {
            return err
        }
    }

    function getUrl(post) {
        const url = pb.files.getUrl(post, post?.photo);
        return url;
    }

    async function follow(followed) {
        const res = await pb.collection('users').update(pb.authStore.model.id, { following: [...user.following, followed.id] })
        setUser(res);
        getFeedPost(res);
    }

    async function fetchData() {
        if (pb.authStore.isValid) {
            const user1 = await getUser()
            setUser(user1);
            await getFeedPost(user1);
            await checkStreak(user1)
        }
    }

    async function checkStreak(user1) {
        if (!user1.checkToday) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            const result = await pb.collection('posts').getFullList(200, { filter: `user="${user1.id}"` });

            const hasPostYesterday = result.some(post => {
                const postDate = new Date(post.created);
                return postDate.toDateString() === yesterday.toDateString();
            });

            if (hasPostYesterday) {
                const res = await pb.collection('users').update(pb.authStore.model.id, { streak: user1.streak + 1, checkToday: true });
                setUser(res);
            } else {
                const res = await pb.collection('users').update(pb.authStore.model.id, { streak: 0, checkToday: true });
                setUser(res);
            }
        }
    }

    async function updateProfiePicture(data) {
        const res = await pb.collection('users').update(pb.authStore.model.id, data);
        setUser(res);
        return res
    }

    async function search(searchTerm) {
        const result = await pb.collection('users').getFullList(200, { filter: `username~"${searchTerm}"` });
        return result;
    }

    async function unfollow(unfollowed) {
        const res = await pb.collection('users').update(pb.authStore.model.id, { following: user.following.filter(id => id === unfollowed.id) })
        setUser(res);
        getFeedPost(res);
    }

    useEffect(() => {
        fetchData()
        return () => { }
    }, [pb.authStore.isValid])


    return (
        <UserContext.Provider value={{ user, createPost, posts, getUrl, getUserById, getPostByUser, follow, fetchData, updateProfiePicture, search, unfollow }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    return context;
};