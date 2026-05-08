class CreateInternProfiles < ActiveRecord::Migration[8.1]
  def change
    create_table :intern_profiles do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.string :university
      t.string :grade
      t.text :bio
      t.string :github_url
      t.string :portfolio_url

      t.timestamps
    end
  end
end
