# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: %i[show update destroy]

  def index
    @posts = FilterPostsBasedOnCategoriesService.new(
      params: params,
      current_organization: @current_organization
      ).process!
      .order(created_at: :desc)
      .page(params[:page]&.to_i || Constants::DEFAULT_PAGE_NUMBER)
      .per(Constants::DEFAULT_PAGE_SIZE)
    @current_user = current_user
    render :index
  end

  def create
    post = Post.new(post_params.merge(user: current_user, organization: current_organization))
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
      @post = current_organization.posts.find_by!(slug: params[:slug])
    end

    def post_params
      params.require(:post).permit(:title, :description, :user_id, :organization_id, :status, category_ids: [])
    end
end
