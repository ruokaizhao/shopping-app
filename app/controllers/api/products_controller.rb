class Api::ProductsController < ApplicationController

  def index
    products = Product.all
    render json: products, status: :ok
  end

  def show
    product = Product.find(params[:id])
    render json: product, serializer: ProductReviewSerializer, status: :ok
  end

  def search
    search = params[:search].downcase
    products = Product.search_items(search)
    render json: products, status: :ok
  end

  private
  
  def authorize
    return render json: { errors: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

end
