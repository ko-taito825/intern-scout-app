class CompanyProfile < ApplicationRecord
  belongs_to :user
  has_many :jobs, dependent: :destroy

  def display_name
    name.presence || "企業名未設定"
  end
end
