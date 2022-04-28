class AddQuantityToCarts < ActiveRecord::Migration[7.0]
  def change
    add_column :carts, :quantity, :integer
  end
end
