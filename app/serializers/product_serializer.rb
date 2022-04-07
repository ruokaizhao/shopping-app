class ProductSerializer < ActiveModel::Serializer
  attributes :id, :title, :price, :image, :description, :rating

  def rating
    self.object.reviews.average(:rating)
  end
  
end
