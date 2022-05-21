class Api::VenuesController < ApplicationController
    skip_before_action :authorize, only: [:index]
    before_action :find_venue, only: [:show, :update, :destroy]
    
    def index
      render json: Venue.preload(:events).all
    end
  
    def create
      venue = @current_user.events.create!(venue_params)
      render json: venue, status: :created
    end
  
    private
  
    def find_venue
        @venue = Venue.find(params[:id])
    end

    def venue_params
      params.permit(:name, :address, :city, :state, :zip_code, :event)
    end
  
end
