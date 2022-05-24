class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :date, :image_url, :start_time, :total_commenters
  belongs_to :venue
  has_many :comments

 
  
end
