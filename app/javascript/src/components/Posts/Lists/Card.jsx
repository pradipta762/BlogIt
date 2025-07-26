import React from "react";

import { useVote } from "hooks/reactQuery/useVotesApi";
import { Up, Down } from "neetoicons";
import { Typography, Button, Tag } from "neetoui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";

import List from "../Categories/List";
import { formatDate } from "../utils";

const Card = ({
  title,
  user,
  categories,
  updated_at,
  slug,
  net_votes,
  is_bloggable,
  user_vote,
}) => {
  const formattedDate = formatDate(updated_at);

  const { mutate: vote } = useVote({});

  const { t } = useTranslation();

  const handleVote = voteType => {
    vote({
      slug,
      vote_type: voteType,
    });
  };

  return (
    <div className="flex w-full items-center justify-between border-b border-gray-200 py-3">
      <div>
        <Link to={routes.posts.show.replace(":slug", `${slug}`)}>
          <Typography
            className="mb-3 flex w-max items-center  gap-3 border-b-2 border-white text-xl font-semibold transition delay-150 hover:border-indigo-100"
            style="h2"
          >
            {title}
            {is_bloggable && <Tag label={t("labels.blogIt")} style="success" />}
          </Typography>
        </Link>
        <List {...{ categories }} />
        <div className="mt-3 flex flex-col text-sm text-gray-600">
          <Typography className="font-medium text-black">
            {user?.name}
          </Typography>
          <Typography className="text-sm text-gray-400 ">
            {formattedDate}
          </Typography>
        </div>
      </div>
      <div className="mr-10 flex flex-col items-center justify-center gap-1">
        <Button
          className={user_vote === "upvote" ? "text-green-500" : ""}
          icon={Up}
          style="text"
          tooltipProps={{
            position: "top",
            content: t("labels.toolTipProps.upvote"),
          }}
          onClick={() => handleVote("upvote")}
        />
        {net_votes}
        <Button
          className={user_vote === "downvote" ? "text-red-500" : ""}
          icon={Down}
          style="text"
          tooltipProps={{
            position: "bottom",
            content: t("labels.toolTipProps.downvote"),
          }}
          onClick={() => handleVote("downvote")}
        />
      </div>
    </div>
  );
};

export default Card;
