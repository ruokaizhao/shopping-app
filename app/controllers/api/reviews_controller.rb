class Api::ReviewsController < ApplicationController
  
  def create
    review = Review.create!(review_params)
    render json: review, serializer: UserReviewSerializer, status: :created
  end

  def update
    review = Review.find(params[:id])
    review.update!(rating: params[:rating], content: params[:content])
    render json: review, serializer: UserReviewSerializer, status: :ok
  end

  private

  def review_params
    params.permit(:user_id, :product_id, :content, :rating)
  end

end
