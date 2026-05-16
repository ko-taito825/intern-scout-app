class Message < ApplicationRecord
  belongs_to :scout

  validates :body, presence: true
end
