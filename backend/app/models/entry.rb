class Entry < ApplicationRecord
  belongs_to :company_profile
  has_many :entries, dependent: :destroy
  belongs_to :job
  belongs_to :user
end
