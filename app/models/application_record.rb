# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  def errors_to_sentence
    errors.full_message.to_sentence
  end
end
