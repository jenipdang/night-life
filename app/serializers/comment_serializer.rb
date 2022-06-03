class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :post_by , :event_name, :created_at
  belongs_to :event

  def post_by
    "#{self.object.commenter.username}"
  end

  def event_name
    "#{self.object.event.name}"
  end

end
