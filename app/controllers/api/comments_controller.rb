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
        render json: serialized_comment
    end

    def create #post "/comments" #post "posts/:post_id/comments"
        if params[:post_id] 
            post = Post.find(params[:post_id])
            @comment = post.comments.create!(comment_params)
            render json: serialized_comment, status: 201
        end
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

    def serialized_comment
        @comment.to_json(include: :event)
    end

    def comment_params
        params.require(:comment).permit(:content, :event_id)
    end
end
