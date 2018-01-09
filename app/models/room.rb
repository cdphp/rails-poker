class Room < ApplicationRecord

  has_many :room_users
  has_many :poker_records
  has_many :users, through: :room_users

  STATUS_OPEN   = 0
  STATUS_READY  = 1
  STATUS_FINISH = 2

  STATUS_NAME = {
    STATUS_OPEN   => "open",
    STATUS_READY  => "ready",
    STATUS_FINISH => "finish"
  }
  class << self
    def allot
      Room.where(:lock => false).first || Room.create
    end
  end

  def statistics_data
    colors = YAML.load_file(Rails.root.join('config/colors.yml'))['flat_colors']
    result = {}
    datas  = {}
    # labels = self.poker_records.includes(:user).map(&:number).uniq
    poker_records.each do |record|
      if datas.try(:[], record.number)
        datas[record.number] += 1
      else
        datas[record.number] = 1
      end
    end
    {
      'labels'      => datas.keys,
      'datas'       => datas.values,
      'total_count' => poker_records.count,
      'colors'      => colors.sample(poker_records.count)
    }
  end

  def lock_by user
    self.update(owner_id: user.id, lock: true)
    room_users.destroy_all
    poker_records.destroy_all
  end

  def set_subject subject
    update_attribute(:subject, subject)
  end

  def attendees
    users.uniq
  end

  # status relative
  def get_ready
    update_attribute(:status, STATUS_READY)
  end

  def ready?
    status == STATUS_READY
  end

  def finish
    update_attribute(:status, STATUS_FINISH)
  end

  def finished?
    status == STATUS_FINISH
  end

  def status_name
    STATUS_NAME[status]
  end

  def next_step
    next_step_status = (status + 1) % STATUS_NAME.count
    # next_step_status = (status == STATUS_READY) ? STATUS_FINISH : STATUS_READY
    update_attribute(:status, next_step_status)
    poker_records.destroy_all if next_step_status == STATUS_READY
  end
end
