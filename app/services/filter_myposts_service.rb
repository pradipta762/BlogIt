# frozen_string_literal: true

class FilterMypostsService
  attr_reader :params, :current_user, :current_organization

  def initialize(params:, current_user:, current_organization:)
    @params = params
    @current_user = current_user
    @current_organization = current_organization
  end

  def process!
    filter_myposts
  end

  private

    def filter_myposts
      scope = current_user.posts.includes(:user, :organization, :categories)
        .where(organization_id: current_organization.id)

      scope = filter_by_categories(scope)
      scope = filter_by_status(scope)
      scope = filter_by_title(scope)
    end

    def filter_by_categories(scope)
      return scope unless params[:category_ids].present?

      scope.joins(:categories).where(categories: { id: params[:category_ids] })
    end

    def filter_by_status(scope)
      return scope unless params[:status].present?
      return scope unless Post.statuses.key?(params[:status])

      scope.where(status: params[:status])
    end

    def filter_by_title(scope)
      return scope unless params[:title].present?

      title = params[:title].downcase
      adapter = ActiveRecord::Base.connection.adapter_name.downcase

      if adapter.include?("sqlite")
        scope.where("LOWER(title) LIKE ?", "%#{title}%")
      else
        scope.where("title ILIKE ?", "%#{title}%")
      end
    end
end
