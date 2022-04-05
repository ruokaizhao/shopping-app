class UserReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :product_id, :content, :rating, :name

  def name
    self.object.user.name
  end
end
