# frozen_string_literal: true

class Organization < ApplicationRecord
  MAX_NAME_LENGTH = 125

  has_many :posts
  has_many :users

  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }
end
