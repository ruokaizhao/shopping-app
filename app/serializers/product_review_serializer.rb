# Return reviews with corresponding product so that frontend can render related reviews for a product.
class ProductReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :price, :image, :description, :rating
  has_many :reviews, serializer: UserReviewSerializer

  def rating
    self.object.reviews.average(:rating)
  end
  
end
