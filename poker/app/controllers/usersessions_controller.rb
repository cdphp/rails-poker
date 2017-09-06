class UsersessionsController < ApplicationController
  skip_before_filter :verify_authenticity_token


  before_action :initial_result

  def new

  end

  def create
    @user = User.find_or_create_by(user_session_params)
    if @user.save
      allacate_room
      session[:current_user_id]    = @user.id
      session.delete(:current_room_id)
      session[:current_room_id]    = @room.id
      session[:current_user_name]  = @user.display_name
      @result[:data][:redirect_to] = room_path(@room.id)
    else
      @result[:code] = 1
      @result[:error_message] = 'Login failed.'
    end
    render json: @result
  end

  def join_in
    @user = User.find_or_create_by(user_session_params)
    if @user.save && @room = Room.find(params[:room_id])
      if (old_member = @room.room_users.where(user_id: @user.id).last).present?
        @result[:code] = 1
        @result[:error_message] = 'The name already been used, please take another one.'
      else
        Current.user = @user
        # Current.room = @room
        # @room.users << @user
        session[:current_user_id]    = @user.id
        session.delete(:current_room_id)
        session[:current_room_id]    = @room.id
        session[:current_user_name]  = @user.display_name
        @result[:data][:redirect_to] = room_path(@room.id)
      end
    else
      @result[:code] = 1
      @result[:error_message] = 'Login failed.'
    end

    render json: @result
  end

  def destroy
    current_user_session.destroy
    redirect_to new_user_session_url
  end

  private

  def allacate_room
    Room.transaction do
      @room = Room::allot
      @room.set_subject params[:subject]
      @room.lock_by @user
      Current.user = @user
      # Current.room = @room
      # @room.users  = [@user]
    end
  end

  def user_session_params
    params.require(:user_session).permit(:display_name)
  end

  def initial_result
    @result = {code: 0, data: {}}
  end

end