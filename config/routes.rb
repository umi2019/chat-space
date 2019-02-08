Rails.application.routes.draw do
  devise_for :users
  root 'messages#index'
  resources :groups do
    resources :messages
  end
  resources :users, only: [:edit, :update]
end
