Rails.application.routes.draw do
  namespace :api do
    resources :intern_profiles, only: [ :index, :show, :create ]
    resources :company_profiles, only: [ :index, :show, :create ]
    resources :scouts, only: [ :create ] do
      resources :messages, only: [ :index, :create]
    end
  end
  
  get "up" => "rails/health#show", as: :rails_health_check

end
