# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_NAME_LENGTH = 110

  has_and_belongs_to_many :posts

  validates :name, presence: true, uniqueness: true, length: { maximum: MAX_NAME_LENGTH }
end
