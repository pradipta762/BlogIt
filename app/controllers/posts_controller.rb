# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: %i[show update destroy]

  def index
    @posts = if params[:my_posts].to_s == "true"
      current_user.posts
        .includes(:user, :categories, :organization)
        .where(organization_id: current_organization.id)
        .order(updated_at: :desc)
        .page(params[:page]&.to_i || Constants::DEFAULT_PAGE_NUMBER)
        .per(Constants::DEFAULT_PAGE_SIZE)
    else
      Post.published
        .includes(:user, :categories, :organization)
        .where(organization_id: current_organization.id)
        .order(created_at: :desc)
        .page(params[:page]&.to_i || Constants::DEFAULT_PAGE_NUMBER)
        .per(Constants::DEFAULT_PAGE_SIZE)
    end
    render :index
  end

  def create
    post = Post.new(post_params)
    post.user = current_user
    post.organization = current_organization
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    render :show
  end

  def update
    @post.update!(post_params)
    render_notice(t("successfully_updated", entity: "Post"))
  end

  def destroy
    @post.destroy!
    render_notice(t("successfully_deleted", entity: "Post"))
  end

  private

    def load_post!
      @post = Post.find_by!(slug: params[:slug])
    end

    def post_params
      params.require(:post).permit(:title, :description, :user_id, :organization_id, :status, category_ids: [])
    end
end
