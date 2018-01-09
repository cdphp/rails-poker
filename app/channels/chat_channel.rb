# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class ChatChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    stream_from "chat_channel_1"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end

  def speak data
    group_id, name_id = PokerEncoder::decode(data['me']).split('x')
    @chat = Chat.new( message: data['message'], user_id: name_id || 0,
                      group_id: group_id)
    @chat.speaking
  end

end
