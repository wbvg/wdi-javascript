Tradr::Application.routes.draw do
    root :to => 'home#index'
  resources :users, :only => [:index, :new, :create]
  resources :stocks, :only => [:index, :new, :create] do
    collection do
      get '/chart/:symbol', :action => 'chart'
    end
  end


  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'
end
