class Api::OrdersController < ApplicationController

  def index
    user = User.find(params[:user_id])
    orders = user.orders
    render json: order, status: :ok
  end

  def create
    order = Order.create!(order_params)
    render json: order, status: :create
  end

  private

  def order_permit
    params.permit(:title, :price, :description, :image, :user_id, :quantity)
  end
  
end
