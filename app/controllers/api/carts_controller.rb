class Api::CartsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def index
    carts = Cart.all
    render json: carts, status: :ok
  end

  def create
    cart = Cart.create!(cart_params)
    render json: cart, status: :created
  end

  def destroy
    cart = Cart.find(params[:id])
    cart.delete
    head :no_content
  end

  private

  def cart_params
    params.permit(:title, :price, :rating, :description, :image, :user_id)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found_response(exception)
    render json: { errors: "#{exception.model} not found" }, status: :not_found
  end

end
