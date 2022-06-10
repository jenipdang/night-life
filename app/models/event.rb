class Event < ApplicationRecord
  belongs_to :venue
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :commenters, through: :comments, source: :commenter


  validates :name, :date, :start_time, presence: true
  before_save :format_name

  scope :upcoming_events, -> {self.all.where("date > ?", DateTime.now)}

  def format_name
    if self.name[0] != self.name[0].upcase
      self.name = self.name.capitalize
    end
  end

  def self.search_event(search_for)
    if (!search_for.empty?)
    self.where("name like ?", "%#{search_for.titleize}%")
    else
      self.all
    end
  end


  def total_commenters
    self.commenters.uniq.length
  end
  
end
