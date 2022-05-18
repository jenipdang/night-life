class Api::EventController < ApplicationController

  skip_before_action: :authorize, only: [:index]
  
  def index
    render json: Event.all
  end

  def create
    event = @current_user.events.create!(event_params)
    render json: event, status: :created
  end

  private

  def event_params
    params.permit(:name, :image_url, :date, :start_time, :venue)
  end

end
