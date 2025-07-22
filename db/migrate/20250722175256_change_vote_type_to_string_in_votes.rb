# frozen_string_literal: true

class ChangeVoteTypeToStringInVotes < ActiveRecord::Migration[7.1]
  def change
    change_column :votes, :vote_type, :string
  end
end
