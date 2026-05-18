Rails.application.routes.draw do
  namespace :api do
    resources :intern_profiles, only: [ :index, :show, :create, :update ]  do
      collection do
        get :me
      end
    end
    resources :company_profiles, only: [ :index, :show, :create, :update ]
    resources :jobs, only: [ :index, :show, :create ]
    resources :entries, only: [ :create ]
    resources :scouts, only: [ :index, :create ] do
      resources :messages, only: [ :index, :create ]
    end
  end
  
  get "up" => "rails/health#show", as: :rails_health_check

end
