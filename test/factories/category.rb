# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    name { Faker::Lorem.words(number: 4).join(",").titleize }
  end
end
