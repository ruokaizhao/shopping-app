class Api::AddressesController < ApplicationController

  def index
    user = User.find(params[:userId])
    address = user.address
    render json: address, status: :ok
  end

  def create
    address = Address.create!(address_permit)
    render json: address, status: :created
  end

  private

  def address_permit
    params.permit(:fullname, :street, :city, :state, :zipcode, :user_id)
  end

end
