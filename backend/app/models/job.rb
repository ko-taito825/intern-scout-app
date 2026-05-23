class Job < ApplicationRecord
  belongs_to :company_profile
  has_many :entries, dependent: :destroy
end
