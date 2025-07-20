# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
  end

  def test_should_list_all_valid_categories
    get categories_path, as: :json
    assert_response :success

    categories = response.parsed_body["categories"]
    assert_kind_of Array, categories
    assert_equal 1, categories.count
    assert_equal @category.name, categories.first["name"]
  end

  def test_should_create_category
    category_params = { name: "Tech" }

    assert_difference "Category.count", 1 do
      post categories_path, params: { category: category_params }, as: :json
    end

    assert_response :success
    assert_equal I18n.t("successfully_created", entity: "Tech"), response.parsed_body["notice"]
  end
end
