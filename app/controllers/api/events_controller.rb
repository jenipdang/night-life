class Api::EventsController < ApplicationController

skip_before_action :authorize, only: [:index, :show]
before_action :find_event, only: [:show, :update, :destroy]
  
  def index
    render json: Event.all
  end

  def show
    render json: @event
  end

  def create
    @event = current_user.events.create!(event_params)
    render json: @event, status: :created
  end

  #patch "/events/:id"
  def update
    if current_user.posts.include?(@event)
      @event&.update!(event_params)
      render json: @event
    else
      render_unprocessable_entity_response
    end
  end

  #delete "/events/:id"
  def destroy
    if current_user.posts.include?(@event)
      if @event&.destroy
        render json: { message: "Successfully destroyed event"}
      else
        render json: { error: @event.errors.full_messages.to_sentence }
      end
    else
      render_unprocessable_entity_response
    end
  end


  private

    def find_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.permit(:name, :image_url, :date, :start_time, :venue)
    end

end
