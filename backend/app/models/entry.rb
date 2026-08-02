class Entry < ApplicationRecord
  belongs_to :job
  belongs_to :user
  validates :user_id, uniqueness: {
    scope: :job_id,
    message: "はすでにこの求人に応募済みです"
  }
  has_many :entry_messages, dependent: :destroy

  def unread_for?(role)
    entry_messages.any? { |m| m.is_from_company != (role == "company") && !m.is_read }
  end
end
