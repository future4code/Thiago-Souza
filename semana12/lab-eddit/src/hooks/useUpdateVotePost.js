import { useMutation, useQueryClient } from "react-query";
import {
  changePostVote, createPostVote, deletePostVote, getToken
} from "../api";

export default function useUpdateVotePost(postID, userVote) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    updateVoteOnApi,
    {
      onMutate: async (direction) => {
        await queryClient.cancelQueries("posts");

        const previusData = queryClient.getQueryData("posts");

        queryClient.setQueryData("posts", (previusData) => ({
          ...previusData,
          pages: previusData.pages.map((page) => {
            const index = page.findIndex((post) => post.id === postID);

            if (index >= 0) {
              const { userVote } = page[index];

              let vote;
              if (userVote === direction)
                vote = -direction;
              else if (userVote)
                vote = 2 * direction;
              else
                vote = direction;

              page[index].voteSum = Number(page[index].voteSum) + vote || null;
              page[index].userVote = userVote === direction ? null : direction;
            }

            return page;
          })
        }));

        return previusData;
      },
      onError: (error, _, previusData) => {
        queryClient.setQueryData("posts", previusData);
        const errorString = error.response?.data || "erro fora da api";
        alert(`Erro ao atualizar o voto\n${errorString}`);
      },
      onSettled: () => queryClient.invalidateQueries("posts")

    }
  );

  function updateVoteOnApi(direction) {
    const token = getToken();

    if (direction === userVote)
      return deletePostVote(postID, token);

    if (userVote)
      return changePostVote(direction, postID, token);

    return createPostVote(direction, postID, token);
  }

  return { updateVote: mutate };
}
