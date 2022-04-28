class Product < ApplicationRecord
  has_many :reviews
  has_many :users, through: :reviews

  def self.search_items(keyword)
    Product.all.where("lower(title) LIKE :search", search: "%#{keyword}%")
  end
end
