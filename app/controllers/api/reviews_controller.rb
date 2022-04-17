class Api::ReviewsController < ApplicationController
  before_action :authorize
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  
  def create
    review = Review.create!(review_params)
    render json: review, serializer: UserReviewSerializer, status: :created
  end

  def update
    review = Review.find(params[:id])
    review.update!(rating: params[:rating], content: params[:content])
    render json: review, serializer: UserReviewSerializer, status: :ok
  end

  def destroy
    review = Review.find(params[:id])
    review.destroy
    head :no_content
  end

  private

  def review_params
    params.permit(:user_id, :product_id, :content, :rating)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def authorize
    return render json: { errors: ["Not authorized"] }, status: :unauthorized unless session.include? :user_id
  end

end
