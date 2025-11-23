class OrdersController < ApplicationController
  before_action :require_admin!, only: [:index]
  skip_before_action :verify_authenticity_token

  def index
    render json: {
      status: true,
      data: Order.order(updated_at: :desc).all.as_json(
        include: {
          order_description: {
            include: :item
          }
        }
      )
    }
  end

  def mine
    @list = Order
              .order(updated_at: :desc)
              .includes(order_description: :item)
              .where(user_id: current_user.id)

    render json: {
      status: true,
      data: @list.as_json(
        include: {
          order_description: {
            include: :item
          }
        }
      )
    }
  end

  def create
    @order = Order.new(
      user_id: current_user.id,
      amount: 1000,
      order_description: params[:items].map { |it|
        OrderDescription.new(
          item_id: it[:item],
          quantity: it[:quantity]
        )
      }
    )

    if @order.save
      render json: {
        status: true,
        data: @order
      }, include: :order_description
    else
      render json: {
        status: false,
        error: @order.errors
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
