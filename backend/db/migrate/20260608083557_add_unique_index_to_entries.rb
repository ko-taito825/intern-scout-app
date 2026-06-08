class AddUniqueIndexToEntries < ActiveRecord::Migration[8.1]
  def change
  add_index :entries, [:job_id, :user_id], unique: true
end
end
