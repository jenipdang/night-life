class Api::UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  # def index
  #   users = User.all
  #   render json: users, 
  # end

  def show
    render json: @current_user
  end

  def update
    if @current_user || @current_user.admin?
      user.update!(params.permit(:email, :username))
      render json: @current_user
    else
      render json: { error: "Incorrect old password." }, status: :not_found
    end
  end

  def destroy
    @current_user.destroy
    head :no_content
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation, :email)
  end

end
