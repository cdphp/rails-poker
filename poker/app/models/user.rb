class User < ApplicationRecord
  require 'identicon'
  has_many :room_users
  has_many :rooms, through: :room_users


  def join_in room
    if (old_member = room.room_users.where(user_id: self.id).last).present?
      old_member.update_attribute(:join_date, Time.now)
    else
      room.users << self
    end
  end

  def avatar
    key = "poker|#{display_name}|#{updated_at}|#{Date.today}"
    Identicon.data_url_for key, 128, [240, 240, 240]
  end
end
