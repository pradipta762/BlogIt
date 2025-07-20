# frozen_string_literal: true

require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category)
    @post = create(:post, user: @user, organization: @organization, categories: [@category])

    @headers = headers(@user)
  end

  def test_should_list_all_published_post_for_valid_user
    get posts_path(my_posts: true), headers: @headers
    assert_response :success

    slugs = response.parsed_body["posts"].map { |post| post["slug"] }
    assert_includes slugs, @post.slug
  end

  def test_should_create_a_valid_post
    post_params = {
      title: "New post",
      description: "Description of new post",
      status: "draft",
      category_ids: [@category.id]
    }

    post posts_path, params: { post: post_params }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_created", entity: "Post"), response_json["notice"]
  end

  def test_not_found_error_rendered_for_invalid_post_slug
    invalid_slug = "invalid-slug"

    get post_path(invalid_slug), headers: @headers
    assert_response :not_found
    assert_equal I18n.t("post.not_found"), response.parsed_body["error"]
  end

  def test_should_show_post
    get post_path(@post.slug), headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal @post.id, response_json[:post][:id]
  end

  def test_creator_can_update_any_post_field
    new_title = "#{@post.title}-(updated)"
    patch post_path(@post.slug), params: { post: { title: new_title } }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_updated", entity: "Post"), response_json["notice"]
    assert_equal new_title, @post.reload.title
  end

  def test_should_destroy_post
    assert_difference "Post.count", -1 do
      delete post_path(@post.slug), headers: @headers
    end
  end
end
