class Api::AddressesController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

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

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found_response(exception)
    render json: { errors: ["#{exception.model} not found"] }, status: :not_found
  end

end
