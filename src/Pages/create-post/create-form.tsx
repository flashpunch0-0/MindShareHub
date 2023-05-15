import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import postimage from "../../images/postimage.jpg";
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
    <div className=" flex justify-center items-center w-11/12 ">
      <div className="flex p-14  w-7/12 rounded-lg shadow-2xl border border-yellow-400">
        <div className=" w-7/12">
          <form
            className=" flex-row items-center text-yellow-400  "
            onSubmit={handleSubmit(onCreatePost)}
          >
            <input
              type="text "
              placeholder="Title.."
              {...register("title")}
              className=" w-full mt-5 mb-5 border-2 border-black"
            />
            <p className=" text-red-500">{errors.title?.message}</p>
            <textarea
              placeholder="Description.."
              {...register("description")}
              className=" w-full mt-5 mb-5 border-2 border-black"
            />
            <p className=" text-red-500">{errors.description?.message}</p>
            <input type="submit" className="mt-5 mb-5 border-2 border-black" />
          </form>
        </div>
        <div className="flex-row w-5/12 justify-center items-center   ">
          <img src={postimage} className=" mx-10 h-64 w-64" alt="" />
          <span className=" text-yellow-400 flex justify-center  font-semibold text-xl mt-4 tracking-widest">
            Post
          </span>
        </div>
      </div>
    </div>

    // return (
    //   <form onSubmit={handleSubmit(onCreatePost)}>
    //     <input
    //       type="text"
    //       placeholder="Title.."
    //       {...register("title")}
    //       className="border-2 border-black"
    //     />
    //     <p className=" text-red-500">{errors.title?.message}</p>
    //     <textarea
    //       placeholder="Description.."
    //       {...register("description")}
    //       className="border-2 border-black"
    //     />
    //     <p className=" text-red-500">{errors.description?.message}</p>
    //     <input type="submit" className="border-2 border-black" />
    //   </form>
  );
};
