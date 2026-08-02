class Job < ApplicationRecord
  belongs_to :company_profile
  has_many :entries, dependent: :destroy

  def company_display_name
    company_profile&.display_name || "企業名未設定"
  end
end
