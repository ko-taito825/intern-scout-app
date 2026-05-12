class Scout < ApplicationRecord
  belongs_to :company_user, class_name: "User", foreign_key: "company_user_id"
  belongs_to :intern_user, class_name: "User", foreign_key: "intern_user_id"
  has_many :messages, dependent: :destroy
end
