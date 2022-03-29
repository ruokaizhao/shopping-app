class Api::ProductsController < ApplicationController
  before_action :authorize

  def index
    products = Product.all
    render json: products
  end

  private
  
  def authorize
    return render json: { errors: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end
  
end
