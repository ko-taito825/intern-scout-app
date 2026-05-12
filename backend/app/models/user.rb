class User < ApplicationRecord
    has_one :intern_profile
    has_one :company_profile
    has_many :sent_scouts, class_name: "Scout", foreign_key: "company_user_id"
    has_many :received_scouts, class_name: "Scout", foreign_key: "intern_user_id"
end
