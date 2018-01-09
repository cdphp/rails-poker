# encoding: utf-8
class CreateChats < ActiveRecord::Migration[5.0]
  def change
    create_table :chats, :options => 'ENGINE=InnoDB DEFAULT CHARSET=utf8' do |t|
      t.string :message
      t.integer :user_id, default: 0
      t.integer :group_id, default: 0
      t.string :ip, default: ''
      t.timestamps
    end
  end
end
