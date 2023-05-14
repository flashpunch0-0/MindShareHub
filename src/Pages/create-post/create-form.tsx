import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title"),
    description: yup.string().required("You must add a description"),
  });
  // we need not ask the user his username because we already have it when he logs into the app

  interface CreateFormData {
    title: string;
    description: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "Posts");

  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postRef, {
      // title: data.title,
      // description: data.description,
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input
        type="text"
        placeholder="Title.."
        {...register("title")}
        className="border-2 border-black"
      />
      <p className=" text-red-500">{errors.title?.message}</p>
      <textarea
        placeholder="Description.."
        {...register("description")}
        className="border-2 border-black"
      />
      <p className=" text-red-500">{errors.description?.message}</p>
      <input type="submit" className="border-2 border-black" />
    </form>
  );
};
