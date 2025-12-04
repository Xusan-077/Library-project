import { create } from "zustand";

const useLikeStore = create((set, get) => ({
  likes: JSON.parse(localStorage.getItem("likes")) || [],

  toggleLike: (like) => {
    const currentLikes = get().likes;
    const inLike = currentLikes.find((el) => el.id === like.id);

    const updatedLikes = inLike
      ? currentLikes.filter((el) => el.id !== like.id)
      : [like, ...currentLikes];

    set({ likes: updatedLikes });
    localStorage.setItem("likes", JSON.stringify(updatedLikes));
  },
}));

export default useLikeStore;
