class CreateScouts < ActiveRecord::Migration[8.1]
  def change
    create_table :scouts do |t|
      t.references :company_user, foreign_key: { to_table: :users}
      t.references :intern_user, foreign_key: { to_table: :users}
      t.string :status

      t.timestamps
    end
  end
end
