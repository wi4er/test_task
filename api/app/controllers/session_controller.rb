class SessionController < Devise::SessionsController
  respond_to :json
  skip_before_action :verify_authenticity_token, only: :create

  def create
    # logger = ActiveSupport::TaggedLogging.new(Logger.new(STDOUT))

    user = User.find_by(email: params[:email])

    if user&.valid_password?(params[:password])
      sign_in(user)

      render json: {
        status: true,
        user: {
          id: user.id,
          email: user.email
        }
      }, status: :ok
    else
      render json: {
        status: false,
        error: "Invalid login or password"
      }, status: :unauthorized
    end
  end

  def me
    render json: {
      status: !!current_user,
      data: current_user
    }
  end
end
