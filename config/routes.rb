Rails.application.routes.draw do

  mount ActionCable.server => '/cable'

  root "chats#new"
  # root "usersessions#new"

  resources :chats

  # get "new-user", :to => "usersessions#new", as: :new_usersession

  resources :usersessions, except: [:index, :update, :edit] do
    collection do
      post :join_in
    end
  end

  resources :rooms, only: [:show]
  resources :attendees, only: [:index]
  resources :play, only: [:create]
end
