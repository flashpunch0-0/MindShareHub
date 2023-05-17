import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useState, useEffect } from "react";
import { Post } from "./post";
// have to create interface for setPostsLists
// in typescript we have to efine what type of dta is going so we add this Posts in useState definition useState<Post>
export interface Post {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const Main = () => {
  const [postsLists, setPostsLists] = useState<Post[] | null>(null);
  // it is an array of posts so [] an it can be null also
  const postsRef = collection(db, "Posts");
  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsLists(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {postsLists?.map((post) => (
        <Post post={post} />
      ))}
      home page
    </div>
  );
};
