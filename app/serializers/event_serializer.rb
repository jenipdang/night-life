class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :date, :image_url, :start_time, :venue
  belongs_to :venue
end
