class VenueSerializer < ActiveModel::Serializer
  attributes :name, :address, :city, :state, :zip_code
  has_many :events
end
