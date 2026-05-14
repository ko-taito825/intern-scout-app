class AddUniqueIndexToScouts < ActiveRecord::Migration[8.1]
  def change
    add_index :scouts, [:company_user_id, :intern_user_id], unique: true
  end
end
