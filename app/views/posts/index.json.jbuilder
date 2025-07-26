# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post, :id, :title, :description, :created_at, :updated_at, :slug, :status, :is_bloggable

  json.user do
    json.extract! post.user, :id, :name, :email
  end

  json.categories post.categories do |category|
    json.extract! category, :id, :name
  end

  json.net_votes post.net_votes
  json.user_vote post.votes.find_by(user_id: @current_user.id)&.vote_type
end

json.meta do
  json.total_count @posts.total_count
  json.current_page @posts.current_page
  json.total_pages @posts.total_pages
end
