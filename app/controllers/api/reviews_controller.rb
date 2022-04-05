class Api::ReviewsController < ApplicationController
  
  def create
    review = Review.create!(review_params)
    render json: review, serializer: UserReviewSerializer, status: :created
  end

  private

  def review_params
    params.permit(:user_id, :product_id, :content, :rating)
  end
  
end
