class User < ApplicationRecord
  has_secure_password
  has_many :carts
  has_many :reviews
  has_many :products, through: :reviews
  has_one :address
  has_many :orders
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true, length: {maximum: 254}
  validates :password, presence: true, length: {minimum: 6}, if: :password

  def send_password_reset
    self.update!(password_reset_token: self.generate_base64_token, password_reset_sent_at: Time.zone.now)
    UserMailer.with(user: self, token: self.password_reset_token).password_reset_email.deliver_now
  end

  def reset_password(params)
      self.update!(password: params[:password], password_confirmation: params[:password_confirmation])      
      self.update!(password_reset_token: nil, password_reset_sent_at: nil)    
  end

  private

  def generate_base64_token
    SecureRandom.urlsafe_base64
  end

end
