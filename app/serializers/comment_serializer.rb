class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :post_by
  belongs_to :event

  def post_by
    "#{self.object.commenter.username}"
  end

end
