import { addDoc, getDocs, collection, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { Post as IPost } from "./main";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
interface Props {
  post: IPost;
}

interface Like {
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<Like[] | null>(null);
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const addLike = async () => {
    await addDoc(likesRef, { userId: user?.uid, postId: post.id });
    if (user) {
      setLikes((prev) =>
        prev ? [...prev, { userId: user.uid }] : [{ userId: user.uid }]
      );
    }
  };

  const getLikes = async () => {
    const likedata = await getDocs(likesDoc);
    setLikes(likedata.docs.map((doc) => ({ userId: doc.data().userId })));
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
  useEffect(() => {
    getLikes();
  }, []);
  // to call getLikes when the component is getting mounted and not updateed
  // will console log 2 times becuase of react strictmode
  return (
    <div>
      <div className="title">
        <h1 className=" font-extrabold">title -{post.title}</h1>
      </div>
      <div className="body">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <p>@{post.username}</p>
        <button onClick={addLike}>
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
        </button>
        {likes && <p>Likes : {likes?.length}</p>}
      </div>
    </div>
  );
};

// to get likes we do the same thins as we did to get the posts
//  using usestate to present likeamount
//  console.log(likedata.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
// modified bove statement to only likedata.docs as we only need length of that data.docs arrayso write data.docs.length
