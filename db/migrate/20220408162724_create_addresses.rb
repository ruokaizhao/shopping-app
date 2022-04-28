class CreateAddresses < ActiveRecord::Migration[7.0]
  def change
    create_table :addresses do |t|
      t.string :fullname
      t.string :street
      t.string :city
      t.string :state
      t.integer :zipcode
      t.integer :user_id

      t.timestamps
    end
  end
end
