class ItemsController < ApplicationController
  respond_to :json
  skip_before_action :verify_authenticity_token
  before_action :require_admin!, only: [:create, :update, :destroy]

  def index
    render json: {
      status: true,
      data: Item.order(updated_at: :desc).all.as_json(only: [:id, :name, :description, :price, :image, :created_at])
    }
  end

  def show
    render json: {
      status: true,
      data: Item.find(params[:id]).as_json(only: [:id, :name, :description, :price, :image, :created_at])
    }
  end

  def create
    @item = Item.new(
      name: params[:name],
      description: params[:description],
      price: params[:price],
      image: params[:image]
    )

    if @item.save
      render json: {
        status: true,
        data: @item.as_json(only: [:id, :name, :description, :price, :image, :created_at])
      }
    else
      render json: {
        status: false,
        error: @item.errors
      }, status: :bad_request
    end
  end

  def update
    @item = Item.find(params[:id])

    if @item.update(
      name: params[:name],
      description: params[:description],
      price: params[:price],
      image: params[:image]
    )
      render json: {
        status: true,
        data:  @item.as_json(only: [:id, :name, :description, :price, :image, :created_at])
      }
    else
      render json: {
        status: false,
        error: @item.errors
      }, status: :bad_request
    end
  end

  def destroy
    @item = Item.find(params[:id])

    if @item.destroy
      render json: {
        status: true
      }
    else
      render json: {
        status: false,
        error: @item.errors
      }, status: :bad_request
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
