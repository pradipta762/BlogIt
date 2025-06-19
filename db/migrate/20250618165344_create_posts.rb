class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |p|
      p.string :title, null: false
      p.text :description, null: false
      p.integer :upvotes, null: false, default: 0
      p.integer :downvotes, null: false, default: 0
      p.boolean :is_bloggable, default: false

      p.timestamps
    end
  end
end
