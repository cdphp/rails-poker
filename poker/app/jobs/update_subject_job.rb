class UpdateSubjectJob < ApplicationJob
  queue_as :default

  def perform(room)
    ActionCable.server.broadcast "room_channel_#{room.id}", render_message(room)
  end

  private
  def render_message room
    ApplicationController.renderer.render json: {action: 'update_subject', subject: room.subject}
  end
end
