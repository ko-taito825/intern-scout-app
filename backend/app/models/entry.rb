class Entry < ApplicationRecord
  belongs_to :job
  belongs_to :use
  validates :user_id, uniqueness: { 
    scope: :job_id, 
    message: "はすでにこの求人に応募済みです" 
  }
end
