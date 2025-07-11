# frozen_string_literal: true

class AddUserAndOrganizationToPosts < ActiveRecord::Migration[7.1]
  def up
    add_reference :posts, :user, foreign_key: true
    add_reference :posts, :organization, foreign_key: true

    default_organization = Organization.first || Organization.create!(name: "PixelCompute")

    default_user = User.find_or_create_by!(email: "pradipta@example.com") do |user|
      user.name = "Pradipta Dash"
      user.password = "welcome"
      user.password_confirmation = "welcome"
      user.organization = default_organization
    end

    Post.update_all(user_id: default_user.id, organization_id: default_organization.id)

    change_column_null :posts, :user_id, false
    change_column_null :posts, :organization_id, false
  end

  def down
    remove_reference :posts, :user, foreign_key: true
    remove_reference :posts, :organization, foreign_key: true
  end
end
