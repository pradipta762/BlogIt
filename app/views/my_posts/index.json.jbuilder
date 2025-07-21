# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post, :id, :title, :description, :created_at, :updated_at, :slug, :status

  json.user do
    json.extract! post.user, :id, :name, :email
  end

  json.categories post.categories do |category|
    json.extract! category, :id, :name
  end
end

json.meta do
  json.total_count @posts.total_count
  json.current_page @posts.current_page
  json.total_pages @posts.total_pages
end
