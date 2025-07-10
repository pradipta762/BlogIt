# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post, :id, :title, :description, :created_at, :updated_at, :slug

  json.user do
    json.extract! post.user, :id, :name, :email
  end

  json.categories post.categories do |category|
    json.extract! category, :id, :name
  end
end
