class StatisticsJob < ApplicationJob
  queue_as :default

  def perform(room_id)
    ActionCable.server.broadcast "room_channel_#{room_id}", statistics_message(room_id)
  end

  private
  def statistics_message room_id
    data = Room.find_by(id: room_id).statistics_data
    ApplicationController.renderer.render json: {action: 'statistics', statistics: data.as_json}
  end
end
