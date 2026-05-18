class CreateJobs < ActiveRecord::Migration[8.1]
  def change
    create_table :jobs do |t|
      t.references :company_profile, null: false, foreign_key: true
      t.string :title
      t.text :content
      t.text :requirements
      t.string :work_style

      t.timestamps
    end
  end
end
