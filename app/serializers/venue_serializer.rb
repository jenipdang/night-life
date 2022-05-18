class VenueSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :city, :state, :zip_code
end
