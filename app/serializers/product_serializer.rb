class ProductSerializer < ActiveModel::Serializer
  attributes :id, :title, :price, :image, :description, :rating, :description_short

  def description_short
    "#{self.object.description[0...100]}......"
  end

  def rating
    self.object.reviews.average(:rating)
  end
  
end
