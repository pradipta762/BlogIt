# frozen_string_literal: true

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

organization = Organization.find_or_create_by!(name: "PixelCompute")

user = User.find_or_create_by!(email: "pradipta@example.com") do |u|
  u.name = "Pradipta Dash"
  u.password = "welcome"
  u.password_confirmation = "welcome"
  u.organization = organization
end

Post.update_all(user_id: user.id, organization_id: organization.id)
