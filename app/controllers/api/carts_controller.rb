class Api::CartsController < ApplicationController

  def index
    user = User.find(params[:user_id])
    carts = user.carts
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

  def update
    cart = Cart.find(params[:id])
    cart.update!(quantity: params[:quantity])
    render json: cart, status: :ok
  end

  private

  def cart_params
    params.permit(:title, :price, :description, :image, :user_id, :quantity)
  end

end
