# frozen_string_literal: true

class FilterPostsBasedOnCategoriesService
  attr_reader :params, :current_organization

  def initialize(params:, current_organization:)
    @params = params
    @current_organization = current_organization
  end

  def process!
    filter_posts
  end

  private

    def filter_posts
      scope = current_organization.posts.published.includes(:user, :organization, :categories, :votes)
        .where(organization_id: current_organization.id)

      scope = filter_by_categories(scope)
    end

    def filter_by_categories(scope)
      return scope unless params[:category_ids].present?

      scope.joins(:categories).where(categories: { id: params[:category_ids] })
    end
end
