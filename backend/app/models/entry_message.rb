class EntryMessage < ApplicationRecord
  belongs_to :entry
  validates :body, presence: true
end
