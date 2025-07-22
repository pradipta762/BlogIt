# frozen_string_literal: true

class VotesController < ApplicationController
  before_action :load_post!

  def create
    vote = @post.votes.find_or_initialize_by(user: current_user)

    if vote.persisted? && vote.vote_type == vote_params[:vote_type]
      vote.destroy!
    else
      vote.update!(vote_type: vote_params[:vote_type])
    end

    @post.reload.update_bloggable_status!
  end

  private

    def load_post!
      puts params.inspect
      @post = current_organization.posts.find_by!(slug: params[:post_slug])
    end

    def vote_params
      params.require(:vote).permit(:vote_type)
    end
end
