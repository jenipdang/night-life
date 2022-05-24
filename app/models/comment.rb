class Comment < ApplicationRecord
  belongs_to :event
  belongs_to :commenter, class_name: "User", foreign_key: :user_id

  validates :content, presence: true, length: { in: 3..2000} 
  validate :appropriate_word

  def appropriate_word
    bad_words = %w(shoot fudge accidempoli fuk shit fuck fucking twat bitch)
    if self.content.match? /(shoot|fudge|accidempoli)/i
      self.errors.add(:content, message: "You used inappropriate word(s). Please make sure you avoid any of the following: #{bad_words.join(", ")}")
    end
  end

end
