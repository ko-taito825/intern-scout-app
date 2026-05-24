class AddIsFromCompanyToMessages < ActiveRecord::Migration[8.1]
  def change
    add_column :messages, :is_from_company, :boolean, default: false
  end
end
