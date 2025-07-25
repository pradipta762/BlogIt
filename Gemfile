# frozen_string_literal: true

source "https://rubygems.org"

ruby "3.3.5"

gem "rails", "~> 7.1.3", ">= 7.1.3.4"

gem "sprockets-rails"

gem "sqlite3", "~> 1.4", group: [:development, :test]

gem "pg", group: [:production]

gem "puma", ">= 5.0"

gem "jsbundling-rails"

gem "jbuilder"

gem "tzinfo-data", platforms: %i[ windows jruby ]

gem "bootsnap", require: false

gem "react-rails", "~> 2.7.1"

gem "bcrypt", "~> 3.1.7"

gem "kaminari"

gem "simplecov", require: false, group: :test

gem "redis"

gem "sidekiq"

group :development, :test do
  gem "debug", platforms: %i[ mri windows ]

  # For code formatting and linting
  gem "rubocop", require: false
  gem "rubocop-rails", require: false

  # Rails integration for factory_bot, a replacement for fixtures
  gem "factory_bot_rails"

  # For auto-generating demo data
  gem "faker"
end

group :development do
  gem "web-console"

  # For linting ERB files
  gem "erb_lint", require: false, git: "https://github.com/Shopify/erb-lint.git", branch: "main"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
end

# PDF generation gem
gem "wicked_pdf"
# wicked_pdf uses the following binary
gem "wkhtmltopdf-binary"
