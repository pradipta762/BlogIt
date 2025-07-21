# frozen_string_literal: true

class MyPostsController < ApplicationController
  def index
    @posts = current_user.posts.includes(:user, :categories, :organization)
      .where(organization_id: current_organization.id)
      .order(updated_at: :desc)
      .page(params[:page]&.to_i || Constants::DEFAULT_PAGE_NUMBER)
      .per(Constants::DEFAULT_PAGE_SIZE)
    render :index
  end

  private

    def load_post!
      @post = current_user.posts.find_by!(slug: params[:slug])
    end

    def post_params
      params.require(:post).permit(:title, :description, :user_id, :organization_id, :status, category_ids: [])
    end
end
