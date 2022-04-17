class Api::AddressesController < ApplicationController

  def index
    user = User.find(params[:user_id])
    address = user.address
    render json: address, status: :ok
  end

  def create
    address = Address.create!(address_params)
    render json: address, status: :created
  end

  def update
    address = Address.find(params[:id])
    address.update!(address_params)
    render json: address, status: :ok
  end

  private

  def address_params
    params.permit(:fullname, :street, :city, :state, :zipcode, :user_id)
  end

end
