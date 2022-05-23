class Api::VenuesController < ApplicationController
    skip_before_action :authorize, only: [:index]
    before_action :check_admin, except: [:index, :show]
    before_action :find_venue, only: [:show, :update, :destroy]
    
    def index
      render json: Venue.all
    end
  
    def create
      venue = @current_user.created_venues.create!(venue_params)
      render json: venue, status: :created
    end
  
    private
  
    def find_venue
        @venue = Venue.find(params[:id])
    end

    def venue_params
      params.permit(:name, :address, :city, :state, :zip_code, :event, :user_id)
    end
  
    def check_admin
      render json: { errors: ["Not Authorized"]}, status: :unauthorized unless @current_user.admin?
    end
    
end
