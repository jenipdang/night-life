class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :commenter
  belongs_to :event

end
