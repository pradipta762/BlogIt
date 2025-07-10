# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: %i[show]

  def index
    @posts = Post.includes(:user, :categories).all
    render :index
  end

  def create
    post = Post.new(post_params)
    post.user = current_user
    post.organization = current_organization
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
      params.require(:post).permit(:title, :description, :user_id, :organization_id, category_ids: [])
    end

    def current_user
      default_user
    end

    def current_organization
      default_organization
    end
end
