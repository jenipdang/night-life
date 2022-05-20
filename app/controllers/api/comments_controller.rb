class Api::CommentsController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]
    before_action :find_comment, only: [:show, :update, :destroy]

    #GET "/comments" or GET "events/:event_id/comments"
    def index 
        if params[:event_id]
            event = Event.find(params[:event_id])
            render json: event.comments
        else #GET "/comments"
            render json: Comment.all
        end
    end

    def show #get "/comments/:id"
        render json: comment
    end

    def create #post "/comments" #post "events/:event_id/comments"
        # if params[:event_id] 
        #     event = Event.find(params[:event_id])
        #     @comment = event.comments.create!(event: event, content: params[:content])
        #     render json: serialized_comment, status: 201
        # end
        event = Event.find(params[:event_id])
        comment = Comment.find_by(event: event, user: @current_user)
        if comment 
            comment.update!(comment_params)
        else
            comment = @current_user.comments.create!(event: event, content: params[:content])
        end
        render json: comment, status: :created
    end

    def update #patch "/posts/:id"
        if @comment&.update(comment_params) 
            render json: serialized_comment
        else
            render json: {error: @comment.errors.full_messages.to_sentence}
        end
    end

    def destroy #delete "/posts/:id"
        if @comment&.destroy
            render json: {message: "Successfully destroyed comment!"}
        else
            render json: {error: @comment.errors.full_messages.to_sentence}
        end
    end

    private

    def find_comment
        @comment = Comment.find(params[:id])
    end

    # def serialized_comment
    #     @comment.to_json(include: :event)
    # end

    def comment_params
        params.permit(:user_id, :content, :event_id)
    end
end
