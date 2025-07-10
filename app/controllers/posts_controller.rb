# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: %i[show]

  def index
    posts = Post.all
    render_json({ posts: })
  end

  def create
    post = Post.new(post_params)
    post.save!
    render_notice(t("successfully_created", entity: "Task"))
  end

  def show
    render :show
  end

  private

    def load_post!
      @post = Post.find_by!(slug: params[:slug])
    end

    def post_params
      params.require(:post).permit(:title, :description, category_ids: [])
    end
end
