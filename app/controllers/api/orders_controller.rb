class Api::OrdersController < ApplicationController

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

end
