# frozen_string_literal: true

class MyPostsController < ApplicationController
  before_action only: %i[index bulk_update bulk_destroy]

  def index
    @posts = FilterMypostsService.new(
      params: params,
      current_user: @current_user,
      current_organization: @current_organization
    ).process!
      .order(updated_at: :desc)
      .page(params[:page]&.to_i || Constants::DEFAULT_PAGE_NUMBER)
      .per(Constants::DEFAULT_PAGE_SIZE)
    render :index
  end

  def bulk_update
    posts = current_user.posts.where(slug: bulk_update_params[:slugs], organization_id: @current_user.organization_id)
    new_status = bulk_update_params[:status]
    posts_to_update = posts.where.not(status: new_status)
    updated_count = posts_to_update.count
    posts_to_update.update_all(status: new_status, updated_at: Time.current)
    render_notice(t("successfully_updated", entity: "#{updated_count} posts"))
  end

  def bulk_destroy
    posts = current_user.posts.where(slug: bulk_destroy_params[:slugs], organization_id: @current_user.organization_id)

    count = posts.destroy_all.count

    render_notice(t("successfully_deleted", entity: "#{count} posts"))
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :user_id, :organization_id, :status, category_ids: [])
    end

    def bulk_update_params
      params.permit(:status, slugs: [])
    end

    def bulk_destroy_params
      params.permit(slugs: [])
    end
end
