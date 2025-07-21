# frozen_string_literal: true

class Organization < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :users, dependent: :destroy

  validates :name, presence: true, length: { maximum: Constants::MAX_NAME_LENGTH }
end
