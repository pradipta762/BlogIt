# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    user.save!
    render_notice(t("successfully_created", entity: "User"))
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :organization_id, :password, :password_confirmation)
    end
end
