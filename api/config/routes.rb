Rails.application.routes.draw do
  resources :items, defaults: { format: :json }
  resources :users, defaults: { format: :json }
  resources :orders, defaults: { format: :json }

  devise_for :users,
             controllers: {
               session: "session"
             }

  devise_scope :user do
    get "session/me", to: "session#me", defaults: { format: :json }
    post "session/sign_in", to: "session#create", defaults: { format: :json }
    delete "session/sign_out", to: "session#destroy", defaults: { format: :json }
  end

  get "up" => "rails/health#show", as: :rails_health_check
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

end
