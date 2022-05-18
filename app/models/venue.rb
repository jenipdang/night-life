class Venue < ApplicationRecord
    has_many :events

    validates :name, :address, :city, :state, :zip_code, presence: true
    validates :zip_code, format: {with: /^\d{5}(-\d{4})?$/}, message: "should be 12345 or 12345-1234"
    
end
