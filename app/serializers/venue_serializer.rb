class VenueSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :city, :state, :zip_code
  has_many :events
end
