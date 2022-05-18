class User < ApplicationRecord
  has_secure_password
  has_many :events, dependent: :destroy
  
  validates :username, presence: true, uniqueness: true, length: { in: 8..25 }
  validates :email, presence: true, uniqueness: true, format: {with: /\A(?<username>[^@\s]+)@((?<domain_name>[-a-z0-9]+)\.(?<domain>[a-z]{2,}))\z/i}
  validates :password, length: {in: 8..250}

end
