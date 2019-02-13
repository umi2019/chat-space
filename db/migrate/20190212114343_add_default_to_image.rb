class AddDefaultToImage < ActiveRecord::Migration[5.0]
  def up
    change_column :messages, :image, :string, default: ''
  end

  def down
    change_column :messages, :image, :string, default: nil
  end
end
