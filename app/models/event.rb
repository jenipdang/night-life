class Event < ApplicationRecord
  belongs_to :venue
  belongs_to :user
  has_many :comments, dependent: :destroy

  has_many :reviews, counter_cache: true 

  validates :name, :date, :start_time, presence: true
  before_save :format_name

  # scope :most_comments, -> {self.joins(:comments).group(:event_id).order("COUNT(events.id) DESC").limit(1)}
  scope :sort_by_name, -> {self.order(name: :asc)}
  scope :sort_by_date, -> {self.order(date: :asc)}

  def format_name
    if self.name[0] != self.name[0].upcase
      self.name = self.name.capitalize
    end
  end

  
end
