class Api::EventsController < ApplicationController

skip_before_action :authorize, only: [:index, :show, :upcoming_events]
before_action :check_admin, except: [:index, :show, :upcoming_events]
before_action :find_event, only: [:show, :update, :destroy]
  
  def index
    render json: Event.preload(:venue).all
  end

  def sort_by_name
    render json: Event.sort_by_name
  end

  def sort_by_date
    render json: Event.sort_by_date
  end

  def upcoming_events
    render json: Event.upcoming_events
  end

  def show
    render json: @event
  end

  def create
    if params[:venue_id]
      venue = Venue.find(params[:venue_id])
      @event = current_user.created_events.create!(venue: venue, name: params[:name], image_url: params[:image_url], date: params[:date], start_time: params[:start_time])
      render json: @event, status: :created
    else
      venue = Venue.create!(venue_params)
      @event = current_user.created_events.create!(venue: venue, name: params[:name], image_url: params[:image_url], date: params[:date], start_time: params[:start_time])
      render json: @event, status: :created
    end
  end


  #patch "/events/:id"
  def update
    @event&.update!(event_params)
    render json: @event, status: :created
  end

  #delete "/events/:id"
  def destroy
    @event&.destroy
    render json: { message: "Successfully destroyed event!"}
  end


  private

    def find_event
      @event = Event.find(params[:id])
    end

    def venue_params
      params.permit(:name, :address, :city, :state, :zip_code, :user_id)
    end

    def event_params
      params.permit(:name, :image_url, :date, :start_time, :venue_id)
    end

    def check_admin
      render json: { errors: ["Not Authorized"]}, status: :unauthorized unless @current_user.admin?
    end


end
