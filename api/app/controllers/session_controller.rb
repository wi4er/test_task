class SessionController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    # logger = ActiveSupport::TaggedLogging.new(Logger.new(STDOUT))

    @user = User.find_by(email: params[:email])

    if @user&.valid_password?(params[:password])
      sign_in(@user)

      render json: {
        status: true,
        data: {
          id: @user&.id,
          email: @user&.email,
          first_name: @user&.first_name,
          last_name: @user&.last_name,
        }
      }, status: :ok
    else
      render json: {
        status: false,
        error: "Invalid login or password"
      }, status: :unauthorized
    end
  end

  def register
    @user = User.new(
      email: params[:email],
      password: params[:password],
      role: "user"
    )

    if @user&.save
      sign_in(@user)

      render json: {
        status: true,
        data: {
          id: @user&.id,
          email: @user&.email,
        }
      }, status: :ok
    else
      render json: {
        status: false,
        error: @user&.errors
      }, status: :bad_request
    end
  end

  def me
    render json: {
      status: !!current_user,
      data: current_user.as_json(only: [:id, :email, :last_name, :first_name, :created_at])
    }
  end

  def update
    @user = User.find(current_user.id)

    @user&.update(
      first_name: params[:first_name],
      last_name: params[:last_name],
      password: params[:password],
    )

    if @user&.save
      render json: {
        status: true,
        data: @user.as_json(only: [:id, :email, :last_name, :first_name, :created_at])
      }
    else
      render json: {
        status: false,
        data: "Authorization required"
      }, status: :unauthorized

    end
  end

  def destroy
    sign_out(:user)
    render json: { status: true }
  end
end
