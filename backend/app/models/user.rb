class User < ApplicationRecord
    has_one :intern_profile
    has_one :company_profile
end
