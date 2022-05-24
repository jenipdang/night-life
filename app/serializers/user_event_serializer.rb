class UserEventSerializer < ActiveModel::Serializer
  attributes :id, :name, :date

  has_many :comments
end
