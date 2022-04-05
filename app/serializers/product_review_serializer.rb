# Return reviews with corresponding product so that frontend can render related reviews for a product.
class ProductReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :price, :image, :description
  has_many :reviews, serializer: UserReviewSerializer
end
