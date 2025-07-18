# frozen_string_literal: true

require "test_helper"

class PostTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @organization = create(:organization)
    @category = create(:category)
    @post = create(:post, user: @user, organization: @organization, categories: [@category])
  end

  def test_values_of_created_at_and_updated_at
    post = build(:post)
    assert_nil post.created_at
    assert_nil post.updated_at

    post.save!
    assert_not_nil post.created_at
    assert_equal post.updated_at, post.created_at

    post.update!(title: "This is an updated post")
    assert_not_equal post.updated_at, post.created_at
  end

  def test_post_should_not_be_valid_without_user
    post = Post.new(title: "Post with no user", description: "This is a post with no user", organization: @organization)
    assert_not post.save
    assert_includes post.errors.full_messages, "User must exist"
  end

  def test_post_should_not_valid_without_title
    @post.title = ""
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Title can't be blank"
  end

  def test_post_title_should_should_be_of_valid_length
    @post.title = "a" * (Post::MAX_TITLE_LENGTH + 1)
    assert @post.invalid?
  end

  def test_post_should_not_valid_without_description
    @post.description = ""
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Description can't be blank"
  end

  def test_post_description_should_should_be_of_valid_length
    @post.description = "a" * (Post::MAX_DESCRIPTION_LENGTH + 1)
    assert @post.invalid?
  end

  def test_post_count_increases_on_saving
    assert_difference ["Post.count"], 1 do
      create(:post)
    end
  end

  def test_post_slug_is_parameterized_title
    title = @post.title
    @post.save!
    assert_equal title.parameterize, @post.slug
  end

  def test_error_raised_for_duplicate_slug
    another_test_post = Post.create!(
      title: "another test post",
      description: "another desc",
      user: @user,
      organization: @organization
    )

    assert_raises ActiveRecord::RecordInvalid do
      another_test_post.update!(slug: @post.slug)
    end

    error_msg = another_test_post.errors.full_messages.to_sentence
    assert_match I18n.t("post.slug.immutable"), error_msg
  end

  def test_updating_title_does_not_update_slug
    assert_no_changes -> { @post.reload.slug } do
      updated_post_title = "Updated post title"
      @post.update!(title: updated_post_title)
      assert_equal updated_post_title, @post.title
    end
  end

  def test_finding_posts_by_matching_category_ids
    filtered_posts = Post.category_ids([@category.id])
    assert_includes filtered_posts, @post
  end

  def test_post_can_be_set_to_draft
    post = create(:post, status: :draft)
    assert_equal "draft", post.status
  end

  def test_invalid_status_is_not_allowed
    post = build(:post, status: "invalid_status")
    assert_not post.valid?
    assert_includes post.errors[:status], "is not included in the list"
  end
end
