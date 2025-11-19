class UsersController < ApplicationController
  before_action :require_admin!, only: [:create, :update, :destroy]

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
    @item = User.new(
      email: params[:email],
      encrypted_password: params[:password]
    )

    if @item.save
      render json: {
        status: true,
        data: {
          email: @item.email,
          password: @item.encrypted_password,
        }
      }
    end
  end

  def update
    @item = User.find(params[:id])

    if @item.update(
      email: params[:email],
      encrypted_password: params[:password],
    )
      render json: {
        status: true,
        data: {
          email: @item.email,
          description: @item.description,
        }
      }
    end
  end

  def destroy
    @item = User.find(params[:id])

    if @item.destroy
      render json: {
        status: true
      }
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
