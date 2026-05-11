Rails.application.routes.draw do
  namespace :api do
    resources :intern_profiles, only: [ :index, :show, :create ]
    resources :company_profiles, only: [ :index, :show, :create ]
  end
  
  get "up" => "rails/health#show", as: :rails_health_check

end
