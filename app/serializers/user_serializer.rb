class UserSerializer < ActiveModel::Serializer
  attributes :username, :email

  has_many :created_events
  has_many :comments, as: :commenter
end
