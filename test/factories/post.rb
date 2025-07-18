# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph(sentence_count: 4) }
    status { "published" }
    is_bloggable { [true, false].sample }
    user
    organization
  end
end
