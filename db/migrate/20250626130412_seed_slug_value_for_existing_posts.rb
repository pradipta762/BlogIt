# frozen_string_literal: true

class SeedSlugValueForExistingPosts < ActiveRecord::Migration[7.1]
  class Post < ActiveRecord::Base
    self.table_name = "posts"
  end

  def up
    Post.reset_column_information
    Post.find_each do |post|
      post.update_column(:slug, post.title.parameterize)
    end
  end

  def down
    Post.update_all(slug: nil)
  end
end
