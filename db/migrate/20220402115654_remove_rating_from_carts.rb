class RemoveRatingFromCarts < ActiveRecord::Migration[7.0]
  def change
    remove_column :carts, :rating, :integer
  end
end
