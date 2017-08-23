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
    if data['message'] == 'joint'
      data['message'] = '加入了聊天.'
    elsif data['message'] == 'quit'
      data['message'] = '退出了聊天'
    end

    @chat = Chat.new message: data['message'], user_id: data['me']
    @chat.save
  end

end
