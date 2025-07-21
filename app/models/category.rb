# frozen_string_literal: true

class Category < ApplicationRecord
  has_and_belongs_to_many :posts

  validates :name, presence: true, uniqueness: true, length: { maximum: Constants::MAX_NAME_LENGTH }
end
