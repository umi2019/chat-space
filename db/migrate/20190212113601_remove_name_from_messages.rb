class RemoveNameFromMessages < ActiveRecord::Migration[5.0]
  def change
    remove_column :messages, :name
  end
end
