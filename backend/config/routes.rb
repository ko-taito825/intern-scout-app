Rails.application.routes.draw do
  namespace :api do
    resources :intern_profiles, only: [ :index, :show, :create, :update ]  do
      collection do
        get :me
      end
    end
    resources :company_profiles, only: [ :index, :show, :create, :update ] do
      collection do
        get :me
      end
    end
    resources :jobs, only: [ :index, :show, :create, :update, :destroy ] do
      #学生が求人に応募するためのルート
       resources :entries, only: [ :create ]
    end
    #企業が届いた応募をまとめてみるためのルート
    resources :entries, only: [ :index ] do
      collection do
        get :me
      end
    end
    resources :scouts, only: [ :index, :create ] do
      collection do
        get :sent
      end
      resources :messages, only: [ :index, :create ]
    end
  end
  get "up" => "rails/health#show", as: :rails_health_check
end
