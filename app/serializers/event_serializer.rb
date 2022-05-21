class EventSerializer < ActiveModel::Serializer
  attributes :name, :date, :image_url, :start_time
  belongs_to :venue
  has_many :comments

  
end
