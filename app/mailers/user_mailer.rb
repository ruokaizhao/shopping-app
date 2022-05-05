class UserMailer < ApplicationMailer
  default from: 'zhaozrk@gmail.com'

  def welcome_email
    @user = params[:user]
    @url  = 'zhaozrk@gmail.com'
    mail(to: @user.email, subject: 'Welcome to My Awesome Site')
  end

  def password_reset_email
    @user = params[:user]
    @token = params[:token]
    @url  = "https://shopping-app-react-ruby.herokuapp.com/reset_password/#{@token}"
    mail(to: @user.email, subject: 'Password reset instructions')
  end  

end
