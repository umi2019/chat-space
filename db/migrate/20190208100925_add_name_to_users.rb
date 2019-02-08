class AddNameToUsers < ActiveRecord::Migration[5.0]
  def up
    add_column :users, :name, :string, null: false, unique: true
  end
end
