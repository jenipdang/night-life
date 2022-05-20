class Api::EventsController < ApplicationController

skip_before_action :authorize, only: [:index, :show]
before_action :check_admin, except: [:index, :show]
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

  def show
    render json: @event
  end

  def create
    if params[:venue_id]
      venue = Venue.find(params[:venue_id])
      @event = current_user.events.create!(event_params)
      render json: @event, status: :created
    else
      Venue.create(venue_params)
      @event = current_user.events.create!(event_params)
      render json: @event, status: :created
    end
  end


  #patch "/events/:id"
  def update
    @event&.update!(event_params)
    render json: @event, status: :created
    # if current_user.events.include?(event)
    #   event&.update!(event_params)
    #   render json: event
    # else
    #   render_unprocessable_entity_response
    # end
  end

  #delete "/events/:id"
  def destroy
    @event&.destroy
    render json: { message: "Successfully destroyed event!"}
    # if current_user.events.include?(@event)
    #   if @event&.destroy
    #     render json: { message: "Successfully destroyed event"}
    #   else
    #     render json: { error: @event.errors.full_messages.to_sentence }
    #   end
    # else
    #   render_unprocessable_entity_response
    # end
  end


  private

    def find_event
      @event = Event.find(params[:id])
    end

    def venue_params
      params.permit(:name, :address, :city, :state, :zip_code)
    end

    def event_params
      params.permit(:name, :image_url, :date, :start_time, :venue)
    end

    def check_admin
      render json: { errors: ["Not Authorized"]}, status: :unauthorized unless @current_user.admin?
    end


end
