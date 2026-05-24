class CreateEntryMessages < ActiveRecord::Migration[8.1]
  def change
    create_table :entry_messages do |t|
      t.references :entry, null: false, foreign_key: true
      t.text :body, null: false
      t.boolean :is_from_company, null: false, default: false
      t.boolean :is_read, null: false, default: false

      t.timestamps
    end
  end
end
