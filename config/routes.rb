# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :posts, only: %i[index create show update], param: :slug
    resources :categories, only: %i[index create show]
    resources :users, only: %i[index create]
    resources :organizations, only: %i[index]
    resource :session, only: [:create, :destroy]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
