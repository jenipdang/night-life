class User < ApplicationRecord
  enum role: [:guest, :admin]
  has_secure_password
  has_many :created_events, foreign_key: :user_id, class_name: "Event", dependent: :destroy
  has_many :comments
 
  attr_accessor :old_password
  
  validates :email, presence: true, uniqueness: true, format: {with: /\A(?<username>[^@\s]+)@((?<domain_name>[-a-z0-9]+)\.(?<domain>[a-z]{2,}))\z/i}
  validates :username, presence: true, length: {in: 6..25}
  validates :password, length: {in: 8..25}

  def post_events
    self.created_events.order(created_at: 'desc')
  end


end
