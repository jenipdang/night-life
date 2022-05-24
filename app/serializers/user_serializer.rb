class UserSerializer < ActiveModel::Serializer
  attributes :username, :email, :created_at, :role

  has_many :created_events, serializer: UserEventSerializer
  has_many :created_venues
  has_many :comments, as: :commenter


end
