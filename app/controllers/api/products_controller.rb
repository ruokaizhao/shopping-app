class Api::ProductsController < ApplicationController
  skip_before_action :authorize

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

end
