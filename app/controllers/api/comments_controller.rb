class Api::CommentsController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]
    before_action :find_comment, only: [:show, :update, :destroy]

    def index 
        if params[:event_id]
            event = Event.find(params[:event_id])
            render json: event.comments
        else 
            render json: Comment.all
        end
    end

    def show 
        render json: @comment
    end

    def create 
        event = Event.find(params[:event_id])
        comment = @current_user.comments.create!(event: event, content: params[:content])
        render json: comment, status: :created
    end

    def update 
            @comment&.update!(comment_params)
            render json: @comment
    end

    def destroy 
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
