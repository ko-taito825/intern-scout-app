class CreateCompanyProfiles < ActiveRecord::Migration[8.1]
  def change
    create_table :company_profiles do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.string :industry
      t.text :description
      t.string :website_url

      t.timestamps
    end
  end
end
