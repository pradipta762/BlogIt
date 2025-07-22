# frozen_string_literal: true

module Constants
  is_sqlite_db = ActiveRecord::Base.connection_db_config.configuration_hash[:adapter] == "sqlite3"
  DB_REGEX_OPERATOR = is_sqlite_db ? "REGEXP" : "~*"
  DEFAULT_PAGE_SIZE = 4
  DEFAULT_PAGE_NUMBER = 1
  MAX_NAME_LENGTH = 110
  MAX_TITLE_LENGTH = 125
  MAX_DESCRIPTION_LENGTH = 10000
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze
  MAX_EMAIL_LENGTH = 255
  MIN_PASSWORD_LENGTH = 6
  VOTE_THRESHOLD = 1
end
