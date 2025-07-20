# frozen_string_literal: true

require "test_helper"

class OrganizationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization_one = create(:organization)
    @organization_two = create(:organization)
  end

  def test_should_get_all_the_organization
    get organizations_path, as: :json
    assert_response :success

    organizations = response.parsed_body["organizations"]
    assert_equal 2, organizations.count
  end
end
