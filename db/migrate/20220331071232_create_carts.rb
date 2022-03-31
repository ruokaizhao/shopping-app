class CreateCarts < ActiveRecord::Migration[7.0]
  def change
    create_table :carts do |t|
      t.string :title
      t.integer :price
      t.integer :rating
      t.text :description
      t.string :image
      t.integer :user_id

      t.timestamps
    end
  end
end
