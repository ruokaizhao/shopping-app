class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.string :title
      t.integer :price
      t.text :description
      t.string :image
      t.integer :user_id
      t.integer :quantity

      t.timestamps
    end
  end
end
