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
        render json: @comment
    end

    def create #post "/comments" #post "events/:event_id/comments"
        event = Event.find(params[:event_id])
        comment = @current_user.comments.create!(event: event, content: params[:content])
        render json: comment, status: :created
    end

    def update #patch "/comment/:id"
        if (@comment.commenter == @current_user || @current_user.admin?)
            @comment&.update!(comment_params)
            render json: @comment
        else
            render json: {errors: @comment.errors.full_messages.to_sentence}
        end
    end

    def destroy #delete "/comment/:id"
        if @comment&.destroy
            render json: {message: "Successfully destroyed comment!"}
        else
            render json: {errors: @comment.errors.full_messages.to_sentence}
        end
    end

    private

    def find_comment
        @comment = Comment.find(params[:id])
    end

    def comment_params
        params.permit(:user_id, :content, :event_id)
    end
end
