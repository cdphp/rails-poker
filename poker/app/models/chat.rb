class Chat < ApplicationRecord

  validates_length_of :message, :maximum => 246

  before_save :deal_before_save
  after_create_commit { ChatBroadcastJob.perform_later self}

  scope :of_room, ->(room_id) { where(room_id: room_id) }

  scope :new_chats, ->(number) { last(number) }

  def deal_before_save
    message.strip!
  end

  def clear_history
    if Chat.select('id').all.count > 10000
      Chat.where('id < ?',Chat.select('id').limit(5000).last.id).delete_all
    end
  end
end
