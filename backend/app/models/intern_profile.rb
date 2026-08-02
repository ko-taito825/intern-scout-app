class InternProfile < ApplicationRecord
  belongs_to :user

  def display_name
    name.presence || "名前未設定"
  end
end
