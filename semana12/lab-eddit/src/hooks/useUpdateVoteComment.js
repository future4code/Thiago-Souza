import { useMutation, useQueryClient } from "react-query";
import {
  changeCommentVote, createCommentVote, deleteCommentVote, getToken
} from "../api";

export default function useUpdateVoteComment(commentID, postID, userVote) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    updateVoteOnApi,
    {
      onMutate: async (direction) => {
        await queryClient.cancelQueries([ "comments", postID ]);

        const previusData = queryClient.getQueryData([ "comments", postID ]);

        queryClient.setQueryData([ "comments", postID ], (previusData) => ({
          ...previusData,
          pages: previusData.pages.map((page) => {
            const index = page.findIndex((comment) => comment.id === commentID);

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
        queryClient.setQueryData([ "comments", postID ], previusData);
        const errorString = error.response?.data || "erro fora da api";
        alert(`Erro ao atualizar o voto\n${errorString}`);
      },
      onSettled: () => queryClient.invalidateQueries([ "comments", postID ])

    }
  );

  function updateVoteOnApi(direction) {
    const token = getToken();

    if (direction === userVote)
      return deleteCommentVote(commentID, token);

    if (userVote)
      return changeCommentVote(direction, commentID, token);

    return createCommentVote(direction, commentID, token);
  }

  return { updateVote: mutate };
}

