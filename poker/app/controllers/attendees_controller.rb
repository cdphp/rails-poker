class AttendeesController  < ApplicationController
  before_action :require_login

  def index
    # attendees = ActiveModelSerializers::SerializableResource.new(Current.room.attendees, {root: "attendees", adapter: :json})
    # do |attendee|
    #   attendee.status = Current.user.id == object.id ? 'myself' : 'online'
    #   attendee.status += " played" if Current.room.ready? && Current.room.poker_records.where(user_id: Current.user).number > 0
    #   attendee.number = Current.room.finished? ? Current.room.poker_records.where(user_id: Current.user).number : '*'
    #   attendee.status += 'xxxxxxxx'
    # end
    # p attendees
    # render json: attendees.as_json
    render json: current_room.attendees, root: "attendees", adapter: :json
  end

  private

end