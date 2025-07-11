# frozen_string_literal: true

class PostsController < ApplicationController
  DEFAULT_PAGE_SIZE = 4
  DEFAULT_PAGE_NUMBER = 1

  before_action :load_post!, only: %i[show]

  def index
    @posts = Post.includes(:user, :categories, :organization)
      .where(organization_id: current_organization.id)
      .order(created_at: :desc)
      .page(params[:page]&.to_i || DEFAULT_PAGE_NUMBER)
      .per(DEFAULT_PAGE_SIZE)
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
end
