class AddNullToGroupname < ActiveRecord::Migration[5.0]
  def up
    change_column_null :groups, :name, false, 0
    change_column :groups, :name, :string, default: ""
  end

  def down
    change_column_null :groups, :name, true, nil
    change_column :groups, :name, :string, default: nil
  end
end
