# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = build(:category)
  end

  def test_category_should_be_valid_with_valid_name
    assert @category.valid?
  end

  def test_category_should_not_be_valid_without_name
    @category.name = ""
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Name can't be blank"
  end

  def test_category_should_be_of_valid_length
    @category.name = "a" * (Category::MAX_NAME_LENGTH + 1)
    assert @category.invalid?
  end
end
