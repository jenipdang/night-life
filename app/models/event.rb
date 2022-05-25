class Event < ApplicationRecord
  belongs_to :venue
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :commenters, through: :comments, source: :commenter


  validates :name, :date, :start_time, presence: true
  before_save :format_name

  ## wishlist - will work on later
  # scope :most_comments, -> {self.joins(:comments).group(:event_id).order("COUNT(events.id) DESC").limit(1)}
  # scope :sort_by_name, -> {self.order(name: :asc)}
  # scope :sort_by_date, -> {self.order(date: :asc)}
  # scope :upcoming_events, -> {self.all.where("date > ?", DateTime.now)}
  # scope :past_events, -> {self.all - self.upcoming_events}

  def format_name
    if self.name[0] != self.name[0].upcase
      self.name = self.name.capitalize
    end
  end

  # #shows all upcoming events 
  # def self.upcoming_events
  #   self.all.where("date > ?", DateTime.now)
  # end

  def total_commenters
    self.commenters.uniq.length
  end
  
end
