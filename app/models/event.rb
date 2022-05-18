class Event < ApplicationRecord
  belongs_to :venue
  belongs_to :user

  has_many :reviews, counter_cache: true 

  validates :name, :date, :start_time, presence: true
  before_save :format_name

  def format_name
    if self.name[0] != self.name[0].upcase
      self.name = self.name.capitalize
    end
  end

end
