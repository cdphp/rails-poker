class RoomUser < ApplicationRecord
  belongs_to :user
  belongs_to :room
  after_create :update_join_date
  after_create :broadcast_user_join
  after_destroy :broadcast_user_delete


  def update_join_date
    self.update_attribute(:join_date, Time.now)
  end

  def broadcast_user_join
    p "broadcast_user_join"
    NewAttendeeJob.perform_now(self.room_id, User.find(self.user_id))
  end

  def broadcast_user_delete
    p "broadcast_user_delete"
    DropAttendeeJob.perform_now(self.room_id, User.find(self.user_id))
  end
end
