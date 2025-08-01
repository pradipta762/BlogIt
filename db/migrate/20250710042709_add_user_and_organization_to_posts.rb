# frozen_string_literal: true

class AddUserAndOrganizationToPosts < ActiveRecord::Migration[7.1]
  def up
    add_reference :posts, :user, foreign_key: true
    add_reference :posts, :organization, foreign_key: true
  end

  def down
    remove_reference :posts, :user, foreign_key: true
    remove_reference :posts, :organization, foreign_key: true
  end
end
