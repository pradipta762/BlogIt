# frozen_string_literal: true

class Organization < ApplicationRecord
  MAX_NAME_LENGTH = 125

  has_many :posts, dependent: :destroy
  has_many :users, dependent: :destroy

  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }
end
