class AddIndexToUsersName < ActiveRecord::Migration[5.0]
  def change
    add_index :users, :name, unique: true
    change_column_null :users, :name, false
  end
end
