class UsersController < ApplicationController
  before_action :require_admin!
  skip_before_action :verify_authenticity_token

  def index
    render json: {
      status: true,
      data: User.all
    }
  end

  def show
    render json: {
      status: true,
      data: User.find(params[:id])
    }
  end

  def create
    @user = User.new(
      email: params[:email],
      first_name: params[:first_name],
      last_name: params[:last_name],
      password: params[:password],
      role: params[:role]
    )

    if @user.save
      render json: {
        status: true,
        data: {
          email: @user.email,
          firstName: @user.first_name,
          secondName: @user.last_name,
          role: @user.role
        }
      }
    else
      render json: {
        status: false,
        error: @user.errors
      }, status: :bad_request
    end
  end

  def update
    @user = User.find(params[:id])

    if @user.update(
      email: params[:email],
      first_name: params[:first_name],
      last_name: params[:last_name],
      password: params[:password],
      role: params[:role]
    )
      render json: {
        status: true,
        data: {
          email: @user.email,
          firstName: @user.first_name,
          secondName: @user.last_name,
          role: @user.role
        }
      }
    else
      render json: {
        status: false,
        error: @user.errors
      }, status: :forbidden
    end
  end

  def destroy
    @user = User.find(params[:id])

    if @user.destroy
      render json: {
        status: true
      }
    else
      render json: {
        status: false,
        error: @user.errors
      }, status: :forbidden
    end
  end

  def require_admin!
    unless current_user&.role === "admin"
      render json: {
        status: false,
        error: "Not allowed"
      }, status: :forbidden
    end
  end
end
