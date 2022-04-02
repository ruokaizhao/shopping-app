class RemoveRatingFromProducts < ActiveRecord::Migration[7.0]
  def change
    remove_column :products, :rating, :integer
  end
end
