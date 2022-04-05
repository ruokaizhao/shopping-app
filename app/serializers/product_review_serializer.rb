class ProductReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :price, :image, :description
  has_many :reviews, serializer: UserReviewSerializer
end
