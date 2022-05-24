Rails.application.routes.draw do
  # get "/comments", to: "comments#index"
  
  namespace :api do
    resources :users, only: [:show]
    # get "/sort-by-name", to: "events#sort_by_name"
    # get "/sort-by-date", to: "events#sort_by_date"
    get "/upcoming-events", to: "events#upcoming_events"
    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
    
    resources :comments, only: [:index]
  
    resources :venues, only: [:index, :create]
  
    resources :events do 
      resources :comments, shallow: true
    end
    
  end
  # all other routes will be load our React application
  # this route definition matches:
  # - *path: all paths not matched by one of the routes defined above
  # - constraints:
  #   - !req.xhr?: it's not a XHR (fetch) request
  #   - req.format.html?: it's a request for a HTML document
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
