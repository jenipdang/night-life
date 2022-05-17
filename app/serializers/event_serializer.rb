class EventSerializer < ActiveModel::Serializer
  attributes :id, :name :date, :start_time, :end_time, :venue
  has_one :user
end
