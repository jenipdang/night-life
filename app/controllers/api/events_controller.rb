class Api::EventController < ApplicationController

  skip_before_action: :authorize, only: [:index]
  
  def index
    render json: Event.all
  end

  def create
    recipe = @current_user.events.create!(recipe_params)
    render json: recipe, status: :created
  end

  private

  def recipe_params
    params.permit(:title, :instructions, :minutes_to_complete)
  end

end
