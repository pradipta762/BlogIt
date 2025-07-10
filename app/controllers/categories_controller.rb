# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :set_category, only: :show

  def index
    categories = Category.all
    render_json({ categories: })
  end

  def create
    category = Category.create!(category_params)
    render_notice(t("successfully_created", entity: category.name))
  end

  def show
    render_json(@category)
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end

    def set_category
      @category = Category.includes(posts: :user).find(params[:id])
    end
end
