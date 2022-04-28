# To return custome "name" property with reviews (reviews that returned with corresponding product) so that
# frontend can access user name when render reviews.
class UserReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :product_id, :content, :rating, :updated_at, :name

  def name
    self.object.user.name
  end
end
