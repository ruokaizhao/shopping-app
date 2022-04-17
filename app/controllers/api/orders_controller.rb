class Api::OrdersController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def index
    user = User.find(params[:user_id])
    orders = user.orders
    render json: orders, status: :ok
  end

  def create
    order = Order.create!(order_params)
    render json: order, status: :created
  end

  private

  def order_params
    params.permit(:title, :price, :description, :image, :user_id, :quantity)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found_response(exception)
    render json: { errors: ["#{exception.model} not found"] }, status: :not_found
  end

end
